import _ from "lodash";

import { IntermediateRepresentation } from "@/types/imr";

export const updateSearchArea = (
  imr: IntermediateRepresentation,
  type: "area" | "polygon" | "bbox",
  value: string | number[]
): IntermediateRepresentation => ({
  ...imr,
  area: {
    type,
    value,
  },
});

export const updateName = (
  imr: IntermediateRepresentation,
  nodeId: number,
  displayName: string
): IntermediateRepresentation => {
  const fullPath = `nodes[${nodeId}].name`;
  const clonedImr = _.cloneDeep(imr);
  _.set(clonedImr, fullPath, displayName);

  return clonedImr;
};

export const addRuleOrGroup = (
  imr: IntermediateRepresentation,
  nodeId: number,
  pathString: string,
  newObject: Object
): IntermediateRepresentation => {
  const fullPath = `nodes[${nodeId}].${pathString}`;
  const clonedImr = _.cloneDeep(imr);

  const arrayAtPath = _.get(clonedImr, fullPath);

  if (!Array.isArray(arrayAtPath)) {
    _.set(clonedImr, fullPath, [newObject]);
  } else {
    arrayAtPath.push(newObject);
  }

  return clonedImr;
};

export const removeRuleOrGroup = (
  imr: IntermediateRepresentation,
  nodeId: number,
  pathString: string
): IntermediateRepresentation => {
  const clonedImr = _.cloneDeep(imr);
  const fullPath = `nodes[${nodeId}].${pathString}`;

  const pathArray = _.toPath(fullPath);

  let parentPath = pathArray.slice(0, -1).join(".");
  let lastPathElement = pathArray[pathArray.length - 1];

  if (lastPathElement === "and" || lastPathElement === "or") {
    parentPath = pathArray.slice(0, -2).join(".");

    lastPathElement = pathArray[pathArray.length - 2];
  }
  const index = parseInt(lastPathElement, 10);

  const parent = _.get(clonedImr, parentPath);

  if (Array.isArray(parent) && !isNaN(index)) {
    parent.splice(index, 1);
    _.set(clonedImr, parentPath, parent);
  }

  return clonedImr;
};

export const switchOperatorAtPath = (
  imr: IntermediateRepresentation,
  nodeId: number,
  pathString: string
): IntermediateRepresentation => {
  const fullPath = `nodes[${nodeId}].${pathString}`;
  const clonedImr = _.cloneDeep(imr);
  const nodeToSwitch = _.get(clonedImr, fullPath);

  const pathArray = _.toPath(fullPath);
  const parentPathArray = pathArray.slice(0, -1);
  const switchedOperator =
    pathArray[pathArray.length - 1] === "and" ? "or" : "and";
  parentPathArray.push(switchedOperator);

  const switchedFullPath = parentPathArray.join(".");

  const imrWithoutPreviousOperatorNode = removeRuleOrGroup(
    clonedImr,
    nodeId,
    pathString
  );

  const updatedImr = _.set(
    imrWithoutPreviousOperatorNode,
    switchedFullPath,
    nodeToSwitch
  );

  return updatedImr;
};

export const updateRuleValue = (
  imr: IntermediateRepresentation,
  nodeId: number,
  pathString: string,
  keyToUpdate: string,
  newValue: any
): IntermediateRepresentation => {
  const fullPath = `nodes[${nodeId}].${pathString}.${keyToUpdate}`;
  const clonedImr = _.cloneDeep(imr);
  _.set(clonedImr, fullPath, newValue);

  return clonedImr;
};
