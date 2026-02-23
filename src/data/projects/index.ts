import type { Project } from "@/types/project.types";
import krustieProject from "./krustie.project";
import mrcnTrProject from "./mrcn-tr.project";

export const projects: Map<string, Project> = new Map(
  [krustieProject, mrcnTrProject].map((project) => [project.slug, project]),
);

export { default as krustie } from "./krustie.project";
export { default as mrcnTr } from "./mrcn-tr.project";
