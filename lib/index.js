import MyStack from './MyStack'

export default function main (app) {
  this.stack = new MyStack(app, 'simple-counter-server')
}
