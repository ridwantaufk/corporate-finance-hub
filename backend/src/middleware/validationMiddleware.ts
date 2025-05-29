import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import {
  createUserValidationRules,
  updateUserValidationRules,
} from "@/graphql/modules/auth/users/user.validation";
import {
  createBiodataValidation,
  updateBiodataValidation,
} from "@/graphql/modules/auth/biodata/biodata.validation";

export const validationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const operationName = req.body?.operationName;

  switch (operationName) {
    case "CreateUser":
      await Promise.all(createUserValidationRules().map((v) => v.run(req)));
      break;
    case "UpdateUser":
      await Promise.all(updateUserValidationRules().map((v) => v.run(req)));
      break;
    case "CreateBiodata":
      await Promise.all(createBiodataValidation.map((v) => v.run(req)));
      break;
    case "UpdateBiodata":
      await Promise.all(updateBiodataValidation.map((v) => v.run(req)));
      break;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
