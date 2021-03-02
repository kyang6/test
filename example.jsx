import React, { useEffect, useContext } from "react";
import { DndProvider, DndContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Frame, { FrameContext } from "react-frame-component";

import Dustbin from "./Dustbin";
import Box from "./Box";

const FrameBindingContext = ({ children }) => {
  const { dragDropManager } = useContext(DndContext);
  const { window } = useContext(FrameContext);

  useEffect(() => {
    dragDropManager.getBackend().addEventListeners(window);
  });

  return children;
};
// Don't use the decorator, embed the DnD context within the iframe
export default function Container() {
  // The react-frame-component will pass the iframe's 'window' global as a context value
  // to the DragDropContext provider. You could also directly inject it in via a prop.
  // If neither the prop or the context value for 'window' are present, the DndProvider
  // will just use the global window.
  return (
    <>
      <div style={{ overflow: "hidden", clear: "both" }}>
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>

      <Frame style={{ width: "100%", height: 400 }}>
        <FrameBindingContext>
          <div style={{ overflow: "hidden", clear: "both" }}>
            <Dustbin />
          </div>
        </FrameBindingContext>
      </Frame>
    </>
  );
}
