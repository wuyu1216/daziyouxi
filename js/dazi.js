/*
* 属性
*   字母表 几个字符  分数  生命值
* 方法
*   开始 产生字符 下落 消失，/进入下一关，重新开始
* */

class Code{
    constructor(){
        this.char = [['A','img/a.png'],['B','img/b.png'],['C','img/c.png'],['D','img/d.png'],['e','img/a.png'],['f','img/a.png'],['G','img/g.png'],['H','img/h.png'],['I','img/i.png'],['J','img/j.png'],['K','img/k.png'],['L','img/l.png'],['M','img/m.png'],['N','img/n.png'],['O','img/o.png'],['P','img/p.png'],['Q','img/q.png'],['R','img/r.png'],['S','img/s.png'],['T','img/t.png'],['U','img/u.png'],['V','img/v.png'],['W','img/w.png'],['X','img/x.png'],['Y','img/y.png'],['Z','img/z.png']];
        this.length = 3;
        this.current = [];
        this.position=[];
        this.speed = 2;
        // 分数
        this.scoreObj = document.querySelector('.box>div:first-child>span');
        this.score = 0;
        this.gq = 5;
        // 生命值
        this.valueObj = document.querySelector('.box>div:last-child>span');
        this.value = 10;
    }
    start(){
        this.getChars(this.length);
        this.drop();
        this.keys();
    }
    // 产生字符
    getChars(length){
        for(let i=0;i<length;i++){
            this.getChar();
        }
    }
    // 产生一个字符

    checkExist(char){
       return  this.current.some(element=>element.innerText==char);
    }
    checkPosition(pos){
        return this.position.some(element=>Math.abs(element-pos)<=50);
    }
    getChar(){
        // 设置随机下标,通过下标获取元素
        let num = Math.floor(Math.random()*this.char.length);
        // this.char[num] this.current[i]
        do{
            num = Math.floor(Math.random()*this.char.length);
        }while(this.checkExist(this.char[num][0]));

        let divs = document.createElement('div');

        // 获取随机位置
        let tops =Math.floor(Math.random()*100);
        // 距离浏览器左右各位200
        let lefts =Math.floor(Math.random()*(window.innerWidth-400)+200);

        do{
            lefts =Math.floor(Math.random()*(window.innerWidth-400)+200);
        }while(this.checkPosition(lefts));

        //随机颜色
        /*function bg() {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            return `rgb(${r},${g},${b})`;
        }*/
        divs.style.cssText=`
        width:50px;height:50px;color:#fff;border-radius:50%;
        font-size:0;text-align:center;line-height:50px;
        position:absolute;top:${tops}px;left:${lefts}px;background:url(${this.char[num][1]}) center no-repeat;
        `;
        divs.innerText = this.char[num][0];
        document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(lefts);
    }

    // 下落
    drop(){
        let _this = this;
        _this.t = setInterval(function () {
            for(let i=0;i<_this.current.length;i++){
                let tops = _this.current[i].offsetTop + _this.speed;
                _this.current[i].style.top = tops + 'px';
                if(tops>=500){
                    document.body.removeChild(_this.current[i]);
                    _this.current.splice(i,1);
                    _this.position.splice(i,1);
                    _this.getChar();

                    _this.value--;
                    _this.valueObj.innerText=_this.value;
                    if(_this.value==-1){
                      let flag =  confirm('是否重新开始');
                        if(flag){
                            _this.restart();
                        }else{
                            close();
                        }

                    }
                }
            }
        },20)

    }

    // 删除
    keys(){
        let that = this;
        document.onkeydown = function (e) {
            // e.code  e.keycode (哪个键)
            // let code = String.fromCharCode(e.keyCode);
            let code = e.key.toUpperCase();

            // current存储的div
            for(let i=0;i<that.current.length;i++){
                if(code == that.current[i].innerText){
                    // 页面
                    document.body.removeChild(that.current[i]);
                    // 数据
                    that.current.splice(i,1);
                    that.position.splice(i,1);
                    that.getChar();

                    that.score++;
                    that.scoreObj.innerText = that.score;
                    // (that.scoreObj.innerText=++that.score);
                    if(that.score==that.gq){
                        that.next();
                    }
                }
            }

        }
    }
    // 下一关
    next(){
        clearInterval(this.t);
        // 先清除视图再清除数据
        console.log(document.body.children);
        this.current.forEach(element=>{
            document.body.removeChild(element);
        });
        this.current=[];
        this.position=[];
        this.length++;
        this.gq+=10;
        this.valueObj.innerText++;
        // 重新产生字符
        this.getChars(this.length);
        this.drop();
    }
    // 重新开始
    restart(){
        clearInterval(this.t);
        this.current.forEach(element=>{
            document.body.removeChild(element);
        });
        this.current=[];
        this.position=[];

        this.score=this.scoreObj.innerText=0;
        this.value=this.valueObj.innerText=10;

        this.length=3;

        this.getChars(this.length);
        this.drop();
    }
}
