import React from "react";
import FileExplorer from "./machine_coding/FileExplorer";
import AutoComplete from "./machine_coding/AutoComplete";
import TicTacToe from "./machine_coding/TicTacToe";
import { ProgressBar } from "./machine_coding/ProgressBar";
import Pagination from "./machine_coding/Pagination";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  // const bars = [5, 10, 20, 70, 80];
  return (
    <React.Fragment>
      <ErrorBoundary>
        {/* <aside>
        <FileExplorer />
      </aside> */}
        {/* <AutoComplete /> */}
        {/* <TicTacToe /> */}
        {/* {bars.map((bar) => (
        <ProgressBar key={bar} progress={bar} />
      ))} */}

        <Pagination />
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;
