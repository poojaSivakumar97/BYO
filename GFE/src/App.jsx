import React from "react";
// import FileExplorer from "./machine_coding/FileExplorer";
// import AutoComplete from "./machine_coding/AutoComplete";
// import TicTacToe from "./machine_coding/TicTacToe";
// import { ProgressBar } from "./machine_coding/ProgressBar";
// import Pagination from "./machine_coding/Pagination";
import ErrorBoundary from "./ErrorBoundary";
import BackToTop from "./machine_coding/BackToTop";
// import UPIForm from "./machine_coding/UPI_AutoComplete";
// import InteractiveShape from "./devtools/InteractiveShape";
const InteractiveShape = React.lazy(() =>
  import("./devtools/InteractiveShape/index.jsx")
);
const App = () => {
  // const bars = [5, 10, 20, 70, 80];
  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          {/* <aside>
        <FileExplorer />
      </aside> */}
          {/* <AutoComplete /> */}
          {/* <TicTacToe /> */}
          {/* {bars.map((bar) => (
        <ProgressBar key={bar} progress={bar} />
      ))} */}
          <BackToTop />
          {/* <InteractiveShape /> */}
          {/* <Pagination /> */}
          {/* <UPIForm /> */}
        </ErrorBoundary>
      </React.Suspense>
    </React.Fragment>
  );
};

export default App;
