import { Request, Response } from "express";

import * as services from "../services/testsServices.js"

export async function create (req: Request, res: Response) {
    const token = req.headers["token"] as string
    if(!token) { throw { type: "not_found" } };

    const test: services.CreateTestsData = req.body;
    if(!test.name || !test.pdfUrl || !test.categoriesId || !test.teacherDisciplinedId) {
        throw { type: "not_found" } ;
    };
    if(typeof(test.categoriesId) !== "number" || typeof(test.teacherDisciplinedId) !== "number") {
        throw { type: "not_found" };
    }

    const create = await services.create(test, token);

    return res.status(201).send(create);
}

export async function filterType (req: Request, res: Response) {
    const token = req.headers["token"] as string;
    if(!token) { throw { type: "not_found" } };

    const typeFilter = req.params.typeFilter;
    if(typeFilter === "disciplines") {
        const disciplines = await viewsByDisciplines(token)
        return res.status(200).send(disciplines);
    }

    if(typeFilter === "teachers") {
        const teacher = viewsByTeachers(token);
        return res.status(200).send(teacher);
    }

}

async function viewsByDisciplines (token: string) {
    const viewsByDisciplines = await services.viewsByDisciplines(token);
    return viewsByDisciplines;
}

async function viewsByTeachers (token: string) {
    const viewsByTeachers = await services.viewsByTeachers(token);
}