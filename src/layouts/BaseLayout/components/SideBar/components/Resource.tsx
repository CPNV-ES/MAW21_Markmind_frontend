export type ResourceProps = { name: string; id: string; };

export default function Resource({ name, id }: ResourceProps) {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
}
