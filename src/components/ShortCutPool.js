export default class ShortCutPool {

  handlerStack = [];

  constructor(){
    /* bind to document */
    document.addEventListener("keydown", this.handleKeys);
  }

  addHandler(name, handler, isModal = false){

    if (this.handlerStack.length ===  0 || isModal)
      this.handlerStack.push([]);
    this.handlerStack[this.handlerStack.length - 1].push({name,handler})
    console.log("Handler added: " + JSON.stringify(this.handlerStack));
  }

  removeHandler(name){
    console.log("HandlerStack before remove" + JSON.stringify(this.handlerStack));

    let topLevel = this.handlerStack[this.handlerStack.length - 1];
    topLevel = topLevel.filter((item) =>
      item.name !== name
    )
    if (topLevel.length === 0)
      this.handlerStack.splice(this.handlerStack.length - 1, 1);

    console.log("HandlerStack after remove" + JSON.stringify(this.handlerStack));
  }

  handleKeys = (e) => {
    this.handlerStack[this.handlerStack.length - 1].forEach((item) => {
      item.handler(e);
    });
  }

}
