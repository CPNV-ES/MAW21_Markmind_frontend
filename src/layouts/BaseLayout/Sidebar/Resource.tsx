import { Resource as ResourceType } from "@/types/resources";
import { Link } from "react-router-dom";
import { useResource } from "@/providers/ResourceProvider";

type ResourceProps = { resource: ResourceType | undefined };
export default function Resource({ resource }: ResourceProps) {
  const { setResource } = useResource();
  if (!resource) return null;

  return (
    <div className="ml-4">
      <h3 onClick={() => { setResource(resource.id) }}>{resource.name}</h3>
    </div>
  );
}
