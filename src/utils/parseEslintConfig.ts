/* eslint-disable @typescript-eslint/no-explicit-any */

import { parse } from "acorn";
import { parse as babelParse } from "@babel/parser";

const parseEslintConfig = (
  fileContent: string,
  fileType: string
): Record<string, any> => {
  let parsedConfig: Record<string, any> = {};

  if (fileType === "json") {
    parsedConfig = JSON.parse(fileContent);
  } else if (fileType === "js" || fileType === "cjs") {
    const ast = parse(fileContent, { ecmaVersion: 2020, sourceType: "module" });
    console.log(ast, "ast");
    ast.body.forEach((node: any) => {
      if (
        node.type === "ExpressionStatement" &&
        node.expression.left &&
        node.expression.left.object.name === "module" &&
        node.expression.left.property.name === "exports"
      ) {
        parsedConfig = node.expression.right.properties.reduce(
          (config: any, prop: any) => {
            config[prop.key.name] = prop.value;
            return config;
          },
          {}
        );
      }
    });
  } else if (fileType === "ts") {
    const ast = babelParse(fileContent, {
      sourceType: "module",
      plugins: ["typescript"]
    });
    console.log(ast, "ast");
    ast.program.body.forEach((node: any) => {
      if (
        node.type === "ExpressionStatement" &&
        node.expression.left &&
        node.expression.left.object.name === "module" &&
        node.expression.left.property.name === "exports"
      ) {
        parsedConfig = node.expression.right.properties.reduce(
          (config: any, prop: any) => {
            config[prop.key.name] = prop.value;
            return config;
          },
          {}
        );
      }
    });
  }

  return parsedConfig;
};

export default parseEslintConfig;
