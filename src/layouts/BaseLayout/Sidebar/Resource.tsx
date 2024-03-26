import { Resource as ResourceType } from "@/types/resources";
import { Link } from "react-router-dom";

type ResourceProps = { resource: ResourceType | undefined };
export default function Resource({ resource }: ResourceProps) {
  if (!resource) return null;

  return (
    <div className="ml-4">
      <h3 onClick={() => { }}>{resource.name}</h3>
    </div>
  );
}
