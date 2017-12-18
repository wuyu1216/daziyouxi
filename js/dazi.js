/*
* 属性
*   字母表 几个字符
* 方法
*   开始 产生字符 下落 消失，/进入下一关，重新开始
* */
class Code{
    constructor(){
        this.char = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        this.length = 3;
        this.current = [];
        this.speed = 2;
    }
    start(){
        this.getChars(this.length);
        this.drop();
    }
    // 产生字符
    getChars(length){
        for(let i=0;i<length;i++){
            this.getChar();
        }
    }
    // 产生一个字符
    getChar(){
        // 设置随机下标,通过下标获取元素
        let num = Math.floor(Math.random()*this.char.length);
        let divs = document.createElement('div');
        // 获取随机位置
        let tops =Math.floor(Math.random()*100);
        // 距离浏览器左右各位200
        let lefts =Math.floor(Math.random()*(window.innerWidth-400)+200);
        //随机颜色
        function bg() {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            return `rgb(${r},${g},${b})`;
        }
        divs.style.cssText=`
        width:50px;height:50px;background:${bg()};color:#fff;border-radius:50%;
        font-size:20px;text-align:center;line-height:50px;
        position:absolute;top:${tops}px;left:${lefts}px;
        `;
        divs.innerText = this.char[num];
        document.body.appendChild(divs);
        this.current.push(divs);
    }

    // 下落
    drop(){
        let _this = this;
        setInterval(function () {
            for(let i=0;i<_this.current.length;i++){
                let tops = _this.current[i].offsetTop + _this.speed;
                _this.current[i].style.top = tops + 'px';
                if(tops>=500){
                    document.body.removeChild(_this.current[i]);
                    _this.current.splice(i,1);
                    _this.getChar();
                }
            }
        },20)

    }
}
