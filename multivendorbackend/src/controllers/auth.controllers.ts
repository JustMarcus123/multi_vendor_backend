/**
 * Author: Mangkholen chongloi(marcus)
Date Created: 2026-10-22
Description: controller for auth
Version: 1.0.0
Copyright: Copyright (c) 2026 marcus. All rights reserved.
 */

import { Request, Response } from "express";
import * as authService from "../services/auth.services";

export async function register(req:Request, res:Response){

    res.status(201).json(await authService.register(req.body));

}