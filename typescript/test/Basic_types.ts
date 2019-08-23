let isDone: boolean = false
let decLiteral: number = 6
let myname: string = `Leon`                   // 同样可以使用模板字符串
let listStr: string[] = ['1', '2', '3']
let listNum: number[] = [1, 2, 3]
let testNum2: Array<number> = [1, 2, 3]
let testStr2: Array<string> = ['1', '2', '3']

// 元组 Tuple
let x: [string, number]
x = ['hello', 10];

// 枚举
enum Color {Red = 1, Green, Blue}             // 规定了从1开始
let red: Color = Color.Red
let colorName: string = Color[2]             
console.log(colorName)                        // 显示'Green'因为上面代码里它的值是2

let notSure: any = 4                          // 可以为任意值，跳过类型检测
let list: any[] = [1, true, "free"]           // 不确定数组数据类型时

function warnUser(): void {
    console.log("This is my warning message")
}
let unusable: void = undefined                // 只能赋予undefined以及null
// let test: number = null                    // null\undefined所有类型的子类型，使用--strictNullChecks，会进行严格控制

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

// 类型断言
let someValue: any = 123
let strLength1: number = (<string>someValue).length
let strLength: number = (someValue as string).length  // 若使用jsx那么只有as是可用的

let nestedArray: number[][] = [[1], [2], [3]]         // 嵌套数组

// 解构数组
let input: [number, number] = [1, 2]
function fn([first, second]: [number, number]) {
    console.log(first)
    console.log(second)
}
fn(input)
let o = {
    a: "foo",
    b: 12,
    c: "bar"
}
let {a: aa, b: bb}: {a: string, b: number} = o
let {a, b}: {a: string, b: number} = o
console.log(aa, bb, a, b)
function keepWholeObject(wholeObject: { a: string, b?: number }) { 
    let { a, b = 1001 } = wholeObject // 给定默认值
    console.log(a, b)
}
keepWholeObject({a: '123',b: 321})
keepWholeObject({a: '123',b: undefined})
function kexuan(a:string, b?:string,c:string="hhh") { //b?: number 此处是设置为可选参数，可选参数要放在必选参数的后面，默认参数的前面。
    console.log(a);
    console.log(b);
    console.log(c);
}
kexuan("eee"); // 只给了a一个参数，b设置可选没赋值所以是undefined，c有个默认参数

// 传入默认值
function test(num: number = 123){
    console.log(num)
}
test(1000)
test()

// 接口
interface LabelledValue {
  label: string
}
function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}
let myObj = {size: 10, label: "Size 10 Object"}
printLabel(myObj)

interface kexuanjiekou {
    name: string
    age?: number  // 可选
}
function kexuanjkt(kexuanjk: kexuanjiekou) {
    if(kexuanjk.age) {
        console.log(`hello my name is ${kexuanjk.name}, i am ${kexuanjk.age}`) 
    } else {
        console.log(`hello my name is ${kexuanjk.name}`)
    }
}
kexuanjkt({name: 'Jackson'})
kexuanjkt({name: 'huangjiaqi', age: 18})

interface Point {
    readonly x: number // 只读属性，只有在初始化的时候赋值，之后不可再更改
    readonly y: number
}
let p1: Point = { x: 10, y: 20 }
// p1.x = 5 会报错
let readonl: number[] = [1, 2, 3, 4]
let readonlarr: ReadonlyArray<number> = readonl
// readonlarr[0] = 12 // error!
// readonlarr.push(5) // error!
// readonlarr.length = 100 // error!
// readonl = readonlarr // error!
readonl = readonlarr as number[]

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  let result = source.search(subString)
  return result > -1 // 已经规定了类型，所以只能返回boolean值
}
console.log(mySearch('123', '2'))

// 可索引类型
interface StringArray {
  [index: number]: string // 同样可以设置只读 readonly
}

let myArray: StringArray;
myArray = ["Bob", "Fred"]

let myStr: string = myArray[0]

// 类的类型
interface ClockInterface {
    currentTime: Date
}

class Clock implements ClockInterface {
    currentTime: Date
    constructor(h: number, m: number) { }
}

// 继承接口
interface Shape {
    color: string
}

interface PenStroke {
    penWidth: number
}

interface Square extends Shape, PenStroke {
    sideLength: number
}

let square = <Square>{}
square.color = "blue"
square.sideLength = 10
square.penWidth = 5.0

// 类
class Greeter {
    greeting: string
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return "Hello, " + this.greeting
    }
}

let greeter = new Greeter("world")

// 继承
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`)
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!')
    }
}

const dog = new Dog()
dog.bark()
dog.move(10)
dog.bark()

// 私有变量 private
class Animal2 {
    private name: string // 设置私有变量
    constructor(theName: string) { this.name = theName; }
}

console.log(new Animal2("Cat")) // new Animal2("Cat").name 错误: 'name' 是私有的.

// protected 类似 private，但是在派生类中可访问
class Person {
    protected name: string
    constructor(name: string) { this.name = name }
}

class Employee extends Person {
    private department: string

    constructor(name: string, department: string) {
        super(name)
        this.department = department
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.` // 如果Person中name是私有private，那么这里this.name将报错
    }
}

let howard = new Employee("Howard", "Sales")
console.log(howard.getElevatorPitch())
// console.log(howard.name); // 错误

class Person2 {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee2 extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard2 = new Employee("Howard", "Sales");
// let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.

class Octopus {
    private readonly name: string
    readonly numberOfLegs: number
    constructor (theName: string, numberOfLegs: number = 123) {
        this.name = theName
        this.numberOfLegs = numberOfLegs
    }
}
let dad = new Octopus("Man with the 8 strong legs")
console.log(dad)
//dad.name
//dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

// 存取器  访问器仅在针对ECMAScript 5及更高版本时可用。 所以编译需要使用 tsc -t es5 Basic_types.ts --strictNullChecks
// let passcode = "secret passcode";

// class Employee3 {
//     private _fullName: string;

//     get fullName(): string {
//         return this._fullName;
//     }

//     set fullName(newName: string) {
//         if (passcode && passcode == "secret passcode") {
//             this._fullName = newName;
//         }
//         else {
//             console.log("Error: Unauthorized update of employee!");
//         }
//     }
// }

// let employee = new Employee3();
// employee.fullName = "Bob Smith";
// if (employee.fullName) {
//     console.log(employee.fullName);
// }

// 静态属性
class Grid {
    static origin = {x: 0, y: 0}
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x)
        let yDist = (point.y - Grid.origin.y)
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0)  // 1x scale
let grid2 = new Grid(5.0)  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}))
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}))
console.log(Grid.origin)

// 抽象类
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在

// 构造函数
class Greeter1 {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter1.standardGreeting;
        }
    }
}

let greeter1: Greeter1;
greeter1 = new Greeter1();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter1 = Greeter1;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter1 = new greeterMaker();
console.log(greeter2.greet());