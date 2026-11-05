export const inspector = null;

function control() {
  return {
    name() {
      return this;
    },
    addEventListener() {
      return this;
    },
  };
}

function folder() {
  return {
    close() {
      return this;
    },
    add() {
      return control();
    },
    addColor() {
      return control();
    },
  };
}

export const gui = {
  addFolder() {
    return folder();
  },
};

export function setDebugView() {}
