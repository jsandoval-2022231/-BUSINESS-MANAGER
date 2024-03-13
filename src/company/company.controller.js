import { response, request } from "express";
import Company from "./company.model.js";
import excel4node from 'excel4node'; 

export const createCompany = async (req, res) => {
    const { name, impactLevel, yearsOfExperience, category } = req.body;

    try {
        const company = new Company({ name, impactLevel, yearsOfExperience, category });
        await company.save();

        res.status(201).json({
            msg: 'Company created successfully!',
            company
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Error trying to create the company",
        });
    }
}

export const getCompanies = async (req = request, res = response) => {
    const query = { status: true };

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
    ]);
    
    res.status(200).json({
        total,
        companies
    });
}

export const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { _id, status, ...data } = req.body;

    await Company.findByIdAndUpdate(id, data);

    const company = await Company.findOne({ _id: id });

    res.status(200).json({
        msg: 'Company updated successfully!',
        company
    });
}

export const getFilterByYears = async (req, res) => {
    const { years } = req.params;
    const query = { status: true, yearsOfExperience: years };

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
    ]);
    

    res.status(200).json({
        total,
        companies
    });
}

export const getFilterByCategory = async (req, res) => {
    const { category } = req.params;
    console.log(category);
    const query = { status: true, category: category };

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
    ]);
    

    res.status(200).json({
        total,
        companies
    });
}


export const getFilterByAZ = async (req, res) => {
    const query = { status: true };
    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query).sort({ name: 1 })
    ]);

    res.status(200).json({
        total,
        companies
    });

}

export const getFilterByZA = async (req, res) => {
    const query = { status: true };
    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query).sort({ name: -1 })
    ]);

    res.status(200).json({
        total,
        companies
    });

}


export const generateExcelReport = async (req, res) => {
    try {
        const businesses = await Company.find();

        const wb = new excel4node.Workbook();

        const ws = wb.addWorksheet('Business Report');

        const headerStyle = wb.createStyle({
            font: {
                bold: true,
            },
        });

        const headers = ['Business Name', 'Impact Level', 'Category', 'Years'];
        headers.forEach((header, index) => {
            ws.cell(1, index + 1).string(header).style(headerStyle);
        });

        businesses.forEach((business, rowIndex) => {
            ws.cell(rowIndex + 2, 1).string(business.name);
            ws.cell(rowIndex + 2, 2).string(business.impactLevel);
            ws.cell(rowIndex + 2, 3).string(business.category);
            ws.cell(rowIndex + 2, 4).number(business.yearsOfExperience);
        });

        const buffer = await wb.writeToBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Companies_Report.xlsx');

        res.send(buffer);

    } catch (error) {
        console.error("Error generating Excel report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

