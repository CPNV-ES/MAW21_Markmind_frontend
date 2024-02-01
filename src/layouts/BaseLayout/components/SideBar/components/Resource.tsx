export type ResourceProps = { name: string; id: number };
import styles from "../SideBar.module.scss";

export default function Resource({ name, id }: ResourceProps) {
  return (
    <div className={styles.row}>
      <p>{name}</p>
    </div>
  );
}
