---
title: javascript函数式编程之 函子（functor）
date: 2017-07-12 15:35:56
tags:
  - javascript 
  - 前端
---
### 一个最简单的容器，一个最简单的函子   
函子`functor` 是实现了 `map` 函数并遵守一些特定规则的容器类型。什么是容器？如下是一个最简单的容器。函子则是`Mappable`的容器。下面的容器实现了`map`，所以它也是**一个最简单的函子**。   
引入数学概念范畴学中的函子是为了要处理一些比较复杂的情况。诸如：控制流（control flow）、异常处理（error handling）、异步操作（asynchronous actions）和状态（state），还有更棘手的副作用（effects）。

```javascript 
var Container = function(x) {
  this.__value = x;
}

Container.of = function(x) { 
  return new Container(x); 
};

Container.of(3)
//=> Container(3)

Container.of("hotdogs")
//=> Container("hotdogs")

Container.of(Container.of({name: "yoda"}))
//=> Container(Container({name: "yoda" }))

// 类型签名: (a -> b) -> Container a -> Container b
Container.prototype.map = function(f){
  return Container.of(f(this.__value))
}

// 7 行代码就实现了很炫的『链式调用』
Container.of(3)
    .map(x => x + 1)                //=> Container(4)
    .map(x => 'Result is ' + x);    //=> Container('Result is 4')

Container.of(2).map(function(two){ return two + 2 })
//=> Container(4)

Container.of("flamethrowers").map(function(s){ return s.toUpperCase() })
//=> Container("FLAMETHROWERS")

Container.of("bombs").map(concat(' away')).map(_.prop('length'))
//=> Container(10)

```
<!-- more -->  

### 第二个函子（`Maybe`）   
为了避免空值，这里出现**第二个函子（`Maybe`）**。它会先检查自己的值是否为空，然后才调用传进来的函数，注意这是简化版的`Maybe`。

```javascript
var Maybe = function(x) {
  this.__value = x;
}

Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
  return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

Maybe.of("Malkovich Malkovich").map(match(/a/ig));
//=> Maybe(['a', 'a'])

Maybe.of(null).map(match(/a/ig));
//=> Maybe(null)

Maybe.of({name: "Boris"}).map(_.prop("age")).map(add(10));
//=> Maybe(null)

Maybe.of({name: "Dinah", age: 14}).map(_.prop("age")).map(add(10));
//=> Maybe(24)

// map 完全有能力以 curry 函数的方式来“代理”任何 functor
// 这样我们就可以像平常一样使用组合(compose)，同时也能正常使用 map 了
import _ from 'lodash';
var compose = _.flowRight;
var add = _.curry(_.add);

// 创造一个柯里化的 map
var map = _.curry((f, functor) => functor.map(f));

var doEverything = map(compose(add(10), _.property("age")));

var functor = Maybe.of({name: "Stark", age: 21});
doEverything(functor);
//=> Maybe(31)

// 有时候函数可以明确返回一个 Maybe(null) 来表明失败，例如：

//  withdraw :: Number -> Account -> Maybe(Account)
var withdraw = curry(function(amount, account) {
  return account.balance >= amount ?
    Maybe.of({balance: account.balance - amount}) :
    Maybe.of(null);
});

//  finishTransaction :: Account -> String
var finishTransaction = compose(remainingBalance, updateLedger); // <- 假定这两个函数已经在别处定义好了

//  getTwenty :: Account -> Maybe(String)
var getTwenty = compose(map(finishTransaction), withdraw(20));


getTwenty({ balance: 200.00});
// Maybe("Your balance is $180.00")

getTwenty({ balance: 10.00});
// Maybe(null)

// 释放容器里的值，通过 return 把输出传递到外部世界
//  maybe :: b -> (a -> b) -> Maybe a -> b
var maybe = curry(function(x, f, m) {
  return m.isNothing() ? x : f(m.__value);
});

//  getTwenty :: Account -> String
var getTwenty = compose(
  maybe("You're broke!", finishTransaction), withdraw(20)
);

getTwenty({ balance: 200.00});
// "Your balance is $180.00"

getTwenty({ balance: 10.00});
// "You're broke!"

```

### `Either`函子
“纯”错误处理。`throw/catch` 并不十分“纯”。当一个错误抛出的时候，我们没有收到返回值，得到了一个警告。**有了`Either`这个函子，我们有一种更好的方式来处理错误，那就是返回一条非常友好的消息作为回应**。　

```javascript
var Left = function(x) {
  this.__value = x;
}

Left.of = function(x) {
  return new Left(x);
}

// 这里不同！！！
Left.prototype.map = function(f) {
  return this;
}

var Right = function(x) {
  this.__value = x;
}

Right.of = function(x) {
  return new Right(x);
}

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}

Right.of("Hello").map(str => str + " World!");
// Right("Hello World!")

Left.of("Hello").map(str => str + " World!");
// Left("Hello")

// Left 和 Right 唯一的区别就在于 map 方法的实现，Right.map 的行为和我们之前提到的 map 函数一样。但是 Left.map 就很不同了：它不会对容器做任何事情，只是很简单地把这个容器拿进来又扔出去。这个特性意味着，Left 可以用来传递一个错误消息。

var getAge = user => user.age ? Right.of(user.age) : Left.of("ERROR!");

//试试
getAge({name: 'stark', age: '21'}).map(age => 'Age is ' + age);
//=> Right('Age is 21')

getAge({name: 'stark'}).map(age => 'Age is ' + age);
//=> Left('ERROR!')

// 另外一个例子
var moment = require('moment');

//  getAge :: Date -> User -> Either(String, Number)
var getAge = curry(function(now, user) {
  var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
  if(!birthdate.isValid()) return Left.of("Birth date could not be parsed");
  return Right.of(now.diff(birthdate, 'years'));
});

getAge(moment(), {birthdate: '2007-07-12'});
// Right(10)

getAge(moment(), {birthdate: 'balloons!'});
// Left("Birth date could not be parsed")

//  fortune :: Number -> String
var fortune  = compose(concat("If you survive, you will be "), add(1));

// 通俗点来讲，一个函数在调用的时候，如果被 map 包裹了，那么它就会从一个非 functor 函数转换为一个 functor 函数。我们把这个过程叫做 lift
//  zoltar :: User -> Either(String, _)
var zoltar = compose(map(console.log), map(fortune), getAge(moment()));

zoltar({birthdate: '2007-07-12'});
// "If you survive, you will be 11"
// Right(undefined)

zoltar({birthdate: 'balloons!'});
// Left("Birth date could not be parsed")

// Either 当作一个错误消息的容器，这样的介绍有失偏颇，它的能耐远不止于此。比如，它表示了逻辑或（也就是 ||）。
// 就像 Maybe 可以有个 maybe 一样，Either 也可以有一个 either。两者的用法类似，但 either 接受两个函数（而不是一个）和一个静态值为参数。这两个函数的返回值类型一致：
//  either :: (a -> c) -> (b -> c) -> Either a b -> c
var either = curry(function(f, g, e) {
  switch(e.constructor) {
    case Left: return f(e.__value);
    case Right: return g(e.__value);
  }
});

//  zoltar :: User -> _
var zoltar = compose(console.log, either(id, fortune), getAge(moment()));

zoltar({birthdate: '2006-12-12'});
// "If you survive, you will be 10"
// undefined

zoltar({birthdate: 'balloons!'});
// "Birth date could not be parsed"
// undefined

```
### `IO`函子

很多事情都是有副作用的或者依赖于外部环境的，比如下面这样：   

```javascript
function readLocalStorage(){
    return window.localStorage;
}

```

这个函数显然不是纯函数，因为它强依赖外部的 window.localStorage 这个对象，它的返回值会随着环境的变化而变化。为了让它“纯”起来，我们可以把它包裹在一个容器内部，请看`IO`：

```javascript
var IO = function(f) {
  this.__value = f;
}

IO.of = function(x) {
  return new IO(function() {
    return x;
  });
}

IO.prototype.map = function(f) {
  return new IO(_.compose(f, this.__value));
}

```

**`IO` 跟之前的 `functor` 不同的地方在于，它的 `__value` 总是一个函数**   
`IO` 把非纯执行动作（impure action）捕获到包裹函数里，目的是延迟执行这个非纯动作。就这一点而言，我们认为 `IO` 包含的是被包裹的执行动作的返回值，而不是包裹函数本身。这在 of 函数里很明显：`IO(function(){ return x })` 仅仅是为了**延迟执行**，其实我们得到的是 `IO(x)`。

```javascript
//  io_window_ :: IO Window
var io_window = new IO(function(){ return window; });

io_window.map(function(win){ return win.innerWidth });
// IO(1430)

io_window.map(_.prop('location')).map(_.prop('href')).map(split('/'));
// IO(["http:", "", "localhost:8000", "blog", "posts"])
// 这里是链式执行

//  $ :: String -> IO [DOM]
var $ = function(selector) {
  return new IO(function(){ return document.querySelectorAll(selector); });
}

$('#myDiv').map(head).map(function(div){ return div.innerHTML; });
// IO('I am some inner html')

// 我们已经把太多不纯的操作(因为对 IO 调用 map 已经积累了太多不纯的操作)积累太多。但是，在某一时刻还是要把它放出来
////// 纯代码库: lib/params.js ///////

//  url :: IO String
var url = new IO(function() { return window.location.href; });

//  toPairs =  String -> [[String]]
var toPairs = compose(map(split('=')), split('&'));

//  params :: String -> [[String]]
var params = compose(toPairs, last, split('?'));

//  findParam :: String -> IO Maybe [String]
var findParam = function(key) {
  return map(compose(Maybe.of, filter(compose(eq(key), head)), params), url);
};

////// 非纯调用代码: main.js ///////

// 调用 __value() 来运行它！
findParam("searchTerm").__value();
// Maybe(['searchTerm', 'wafflehouse'])


// 其实　IO 的 __value 并不是它包含的值，也不是像两个下划线暗示那样是一个私有属性，它是不纯的操作。为了提醒用户它的变化无常，我们把它重命名为 unsafePerformIO
var IO = function(f) {
  this.unsafePerformIO = f;
}

IO.prototype.map = function(f) {
  return new IO(_.compose(f, this.unsafePerformIO));
}

// 这就好多了。现在调用的代码就变成了 findParam("searchTerm").unsafePerformIO()，这样对读者来说就更加直白了

```
### `Task`函子
**异步任务，回调（callback）是通往地狱的狭窄的螺旋阶梯，这种方式的内部机制过于复杂**。

```javascript
// Node readfile example:
//=======================

var fs = require('fs');

//  readFile :: String -> Task(Error, JSON)
var readFile = function(filename) {
  return new Task(function(reject, result) {
    fs.readFile(filename, 'utf-8', function(err, data) {
      err ? reject(err) : result(data);
    });
  });
};

readFile("metamorphosis").map(split('\n')).map(head);
// Task("One morning, as Gregor Samsa was waking up from anxious dreams, he discovered that
// in bed he had been changed into a monstrous verminous bug.")


// jQuery getJSON example:
//========================

//  getJSON :: String -> {} -> Task(Error, JSON)
var getJSON = curry(function(url, params) {
  return new Task(function(reject, result) {
    $.getJSON(url, params, result).fail(reject);
  });
});

getJSON('/video', {id: 10}).map(_.prop('title'));
// Task("Family Matters ep 15")

// 传入普通的实际值也没问题
Task.of(3).map(function(three){ return three + 1 });
// Task(4)
```

例子中的 `reject` 和 `result` 函数分别是失败和成功的回调。正如你看到的，我们只是简单地调用 `Task` 的 `map` 函数，就能操作将来的值，好像这个值就在那儿。   
如果熟悉 `promise` 的话，你该能认出来** `map` 就是 `then`，`Task` 就是一个 `promise`   
与 `IO` 类似**，`Task` 在我们给它绿灯之前是不会运行的。事实上，正因为它要等我们的命令，`IO` 实际就被纳入到了 `Task` 名下，代表所有的异步操作——`readFile` 和 `getJSON` 并不需要一个额外的 `IO` 容器来变纯。更重要的是，当我们调用它的 `map` 的时候，`Task` 工作的方式与 `IO` 几无差别：都是把对未来的操作的指示放在一个时间胶囊里，就像家务列表（chore chart）那样——真是一种精密的拖延术。   

我们必须调用 `fork` 方法才能运行 `Task`，这种机制与 `unsafePerformIO` 类似。但也有不同，不同之处就像 `fork` 这个名称表明的那样，它会 `fork` 一个子进程运行它接收到的参数代码，其他部分的执行不受影响，主线程也不会阻塞。当然这种效果也可以用其他一些技术比如线程实现，但这里的这种方法工作起来就像是一个普通的异步调用，而且 `event loop` 能够不受影响地继续运转。我们来看一下 `fork`：

```javascript
// Pure application
//=====================
// blogTemplate :: String

//  blogPage :: Posts -> HTML
var blogPage = Handlebars.compile(blogTemplate);

//  renderPage :: Posts -> HTML
var renderPage = compose(blogPage, sortBy('date'));

//  blog :: Params -> Task(Error, HTML)
var blog = compose(map(renderPage), getJSON('/posts'));


// Impure calling code
//=====================
blog({}).fork(
  function(error){ $("#error").html(error.message); },
  function(page){ $("#main").html(page); }
);

$('#spinner').show();
```

调用 `fork` 之后，`Task` 就赶紧跑去找一些文章，渲染到页面上。与此同时，我们在页面上展示一个 `spinner`，因为 `fork` 不会等收到响应了才执行它后面的代码。最后，我们要么把文章展示在页面上，要么就显示一个出错信息，视 `getJSON` 请求是否成功而定。   
花点时间思考下这里的控制流为何是线性的。我们只需要从下读到上，从右读到左就能理解代码，即便这段程序实际上会在执行过程中到处跳来跳去。这种方式使得阅读和理解应用程序的代码比那种要在各种回调和错误处理代码块之间跳跃的方式容易得多。`Task` 包含了 `Either`。   

### `monad`函子
**一个 `functor`，只要它定义个了一个 `join` 方法和一个 `of` 方法，并遵守一些定律，那么它就是一个 `monad`**，目的是解除嵌套。`join` 的实现并不太复杂，我们来为 `Maybe` 定义一个：
```javascript
Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.__value;
}

var mmo = Maybe.of(Maybe.of("nunchucks"));
// Maybe(Maybe("nunchucks"))

mmo.join();
// Maybe("nunchucks")

var ioio = IO.of(IO.of("pizza"));
// IO(IO("pizza"))

ioio.join()
// IO("pizza")

var ttt = Task.of(Task.of(Task.of("sewers")));
// Task(Task(Task("sewers")));

ttt.join()
// Task(Task("sewers"))
```

只要遇到嵌套的 `Maybe`，就加一个 `join`，防止它们从手中溜走。我们对 `IO` 也这么做试试看，感受下这种感觉。

```javascript
IO.prototype.join = function() {
  return this.unsafePerformIO();
}

//  log :: a -> IO a
var log = function(x) {
  return new IO(function() { console.log(x); return x; });
}

//  setStyle :: Selector -> CSSProps -> IO DOM
var setStyle = curry(function(sel, props) {
  return new IO(function() { return jQuery(sel).css(props); });
});

//  getItem :: String -> IO String
var getItem = function(key) {
  return new IO(function() { return localStorage.getItem(key); });
};

//  applyPreferences :: String -> IO DOM
var applyPreferences = compose(
  join, map(setStyle('#main')), join, map(log), map(JSON.parse), getItem
);


applyPreferences('preferences').unsafePerformIO();
// Object {backgroundColor: "green"}
// <div style="background-color: 'green'"/>

```
`getItem` 返回了一个 `IO String`，所以可以直接用 `map` 来解析它。`log` 和 `setStyle` 返回的都是 `IO`，所以必须要使用 join 来保证这里边的嵌套处于控制之中。


### **chain 函数**
从上面的例子中可以看到这种模式：我们总是在紧跟着 `map` 的后面调用 `join`。让我们把这个行为抽象到一个叫做 `chain` 的函数里。   

```javascript
//  chain :: Monad m => (a -> m b) -> m a -> m b
var chain = curry(function(f, m){
  return m.map(f).join(); // 或者 compose(join, map(f))(m)
});

```

这里仅仅是把 `map/join` 套餐打包到一个单独的函数中。如果你之前了解过 `monad`，那你可能已经看出来 `chain` 叫做 >>=（读作 `bind`）或者 `flatMap`；都是同一个概念的不同名称罢了。但这里坚持使用 `chain`，因为它是 `JS` 里接受程度最高的一个。我们用 `chain` 重构下上面两个例子：   

```javascript
// map/join
var firstAddressStreet = compose(
  join, map(safeProp('street')), join, map(safeHead), safeProp('addresses')
);

// chain
var firstAddressStreet = compose(
  chain(safeProp('street')), chain(safeHead), safeProp('addresses')
);



// map/join
var applyPreferences = compose(
  join, map(setStyle('#main')), join, map(log), map(JSON.parse), getItem
);

// chain
var applyPreferences = compose(
  chain(setStyle('#main')), chain(log), map(JSON.parse), getItem
);

```

我们把所有的 `map/join` 都替换为了 `chain`，这样代码就显得整洁了些。整洁固然是好事，但 `chain` 的能力却不止于此。因为 `chain` 可以轻松地嵌套多个作用，因此我们就能以一种纯函数式的方式来表示 序列（`sequence`） 和 变量赋值（`variable assignment`）。

```javascript
// getJSON :: Url -> Params -> Task JSON
// querySelector :: Selector -> IO DOM


getJSON('/authenticate', {username: 'stale', password: 'crackers'})
  .chain(function(user) {
    return getJSON('/friends', {user_id: user.id});
});
// Task([{name: 'Seimith', id: 14}, {name: 'Ric', id: 39}]);


querySelector("input.username").chain(function(uname) {
  return querySelector("input.email").chain(function(email) {
    return IO.of(
      "Welcome " + uname.value + " " + "prepare for spam at " + email.value
    );
  });
});
// IO("Welcome Olivia prepare for spam at olivia@tremorcontrol.net");


Maybe.of(3).chain(function(three) {
  return Maybe.of(2).map(add(three));
});
// Maybe(5);


Maybe.of(null).chain(safeProp('address')).chain(safeProp('street'));
// Maybe(null);

```
本来我们可以用 `compose` 写上面的例子，但这将需要几个帮助函数，而且这种风格怎么说都要通过闭包进行明确的变量赋值。相反，我们使用了插入式的 `chain`。顺便说一下，`chain` 可以自动从任意类型的 `map` 和 `join` 衍生出来，就像这样：`t.prototype.chain = function(f) { return this.map(f).join(); }`。如果手动定义 `chain` 能让你觉得性能会好点的话（实际上并不会），我们也可以手动定义它，尽管还必须要费力保证函数功能的正确性——也就是说，它必须与紧接着后面有 `join` 的 `map` 相等。如果 `chain` 是简单地通过结束调用 `of` 后把值放回容器这种方式定义的，那么就会造成一个有趣的后果，即可以从 `chain` 那里衍生出一个 `map`。同样地，我们还可以用 `chain(id)` 定义 `join`。   

我们来看上面的例子。第一个例子中，可以看到两个 `Task` 通过 `chain` 连接形成了一个异步操作的序列——它先获取 `user`，然后用 `user.id` 查找 `user` 的 `friends`。`chain` 避免了 `Task(Task([Friend]))` 这种情况。   

第二个例子是用 `querySelector` 查找几个 `input` 然后创建一条欢迎信息。注意看我们是如何在最内层的函数里访问 `uname` 和 `email` 的——这是函数式变量赋值的绝佳表现。因为 `IO` 大方地把它的值借给了我们。`IO.of` 非常适合做这件事，同时它也解释了为何 `pointed` 这一特性是 `monad` 接口得以存在的重要前提。不过，`map` 也能返回正确的类型：

```javascript
querySelector("input.username").chain(function(uname) {
  return querySelector("input.email").map(function(email) {
    return "Welcome " + uname.value + " prepare for spam at " + email.value;
  });
});
// IO("Welcome Olivia prepare for spam at olivia@tremorcontrol.net");
});

```

最后两个例子用了 `Maybe`。因为 `chain` 其实是在底层调用了 `map`，所以如果遇到 `null`，代码就会立刻停止运行。   
如果觉得这些例子不太容易理解，可以多跑跑代码，多琢磨琢磨，把代码拆开来研究研究，再把它们拼起来看看。总之，返回的如果是“普通”值就用 `map`，如果是 `functor` 就用 `chain`。   
这里我得注意一下，上述方式对两个不同类型的嵌套容器是不适用的。`functor` 组合，monad transformer 可以帮助我们应对这种情况。

### 应用 applicative functor  
> applicative functor 是实现了 ap 方法的 pointed functor
ap 就是这样一种函数，能够把一个 functor 的函数值应用到另一个 functor 的值上。

```javascript
Container.prototype.ap = function(other_container) {
  return other_container.map(this.__value);
}

Container.of(add(2)).ap(Container.of(3));
// Container(5)

// all together now
Container.of(2).map(add).ap(Container.of(3));
// Container(5)

```
记住，this.__value 是一个函数，将会接收另一个 functor 作为参数，所以我们只需 map 它。   
这样就大功告成了，而且代码干净整洁。可以看到，`Container(3)` 从嵌套的 `monad` 函数的牢笼中释放了出来。需要再次强调的是，本例中的 `add` 是被 `map` 所局部调用（partially apply）的，所以 `add` 必须是一个 `curry` 函数。   
我们先来探索一个特性   

```javascript
F.of(x).map(f) == F.of(f).ap(F.of(x))

```

上例中我们使用了 `Task`，这是 `applicative functor` 主要的用武之地。现在我们来看一个更深入的例子。

```javascript
// Http.get :: String -> Task Error HTML

var renderPage = curry(function(destinations, events) { /* render page */  });

Task.of(renderPage).ap(Http.get('/destinations')).ap(Http.get('/events'))
// Task("<div>some page with dest and events</div>")

```

假设我们要创建一个旅游网站，既需要获取游客目的地的列表，还需要获取地方事件的列表。这两个请求就是相互独立的 `api` 调用。   
两个请求将会同时立即执行，当两者的响应都返回之后，`renderPage` 就会被调用。这与 `monad` 版本的那种必须等待前一个任务完成才能继续执行后面的操作完全不同。本来我们就无需根据目的地来获取事件，因此也就不需要依赖顺序执行。   
再次强调，因为我们是使用局部调用的函数来达成上述结果的，所以必须要保证 `renderpage` 是 `curry` 函数，否则它就不会一直等到两个 `Task` 都完成。而且如果你碰巧自己做过类似的事，那你一定会感激 `applicative functor` 这个异常简洁的接口的。这就是那种能够让我们离“奇点”（singularity）更近一步的优美代码。   

再来看另外一个例子。   

```javascript
// 帮助函数：
// ==============
//  $ :: String -> IO DOM
var $ = function(selector) {
  return new IO(function(){ return document.querySelector(selector) });
}

//  getVal :: String -> IO String
var getVal = compose(map(_.prop('value')), $);

// Example:
// ===============
//  signIn :: String -> String -> Bool -> User
var signIn = curry(function(username, password, remember_me){ /* signing in */  })

IO.of(signIn).ap(getVal('#email')).ap(getVal('#password')).ap(IO.of(false));
// IO({id: 3, email: "gg@allin.com"})

```

`signIn` 是一个接收 3 个参数的 `curry` 函数，因此我们需要调用 `ap` 3 次。在每一次的 `ap` 调用中，`signIn` 就收到一个参数然后运行，直到所有的参数都传进来，它也就执行完毕了。我们可以继续扩展这种模式，处理任意多的参数。另外，左边两个参数在使用 `getVal` 调用后自然而然地成为了一个 `IO`，但是最右边的那个却需要手动 `lift`，然后变成一个 `IO`，这是因为 `ap` 需要调用者及其参数都属于同一类型。
   
   
   
   

*参考引用自*：   
[JS函数式编程指南](https://www.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details)   
[JavaScript函数式编程（二）](https://zhuanlan.zhihu.com/p/21926955)