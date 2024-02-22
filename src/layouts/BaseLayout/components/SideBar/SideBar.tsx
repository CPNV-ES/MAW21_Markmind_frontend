import Workspace from "./components/Workspace";
import { Workspace as WorkspaceModel } from "../../../../models/workspace";
import Collections from "./components/Collections";
import styles from "./SideBar.module.scss";
import { ModelErrors } from "../../../../exceptions/modelErrors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./sideBar.module.scss";


export default function SideBar() {
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceModel>();
  const { workspaceId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await WorkspaceModel.getOne(
          workspaceId ? parseInt(workspaceId) : 0
        );
        setCurrentWorkspace(data);
      } catch (error: unknown) {
        if (error instanceof ModelErrors) {
          console.error(error.message);
        }
      }
    })();
  }, [workspaceId]);

  return (
    <aside className={styles.sidebar}>
      <Workspace workspace={currentWorkspace?.name} />
      <div>
        {currentWorkspace ? (
          <Collections collections={currentWorkspace.collections} />
        ) : null}
      </div>
    </aside>
  );
}
