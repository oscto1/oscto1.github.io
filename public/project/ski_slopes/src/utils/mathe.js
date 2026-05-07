import Utils from "./utils.js";

class Mathe {
    // constructor(){
    //     super();
    // }

    generateQuestion(){
        this.utils = new Utils();
        let n1 = Math.round(this.utils.randomNumber(0,10));
        let n2 = Math.round(this.utils.randomNumber(0,10));
        let operacion = Math.round(this.utils.randomNumber(0,2));
        let question = "";
        let answer = 0;

        switch(operacion){
            case 0:
                question = n1 + " + " + n2;
                answer = n1 + n2;
                break;
            case 1:
                if(n1>=n2){
                    question = n1 + " - " + n2;
                    answer = n1 - n2;
                }else{
                    question = n2 + " - " + n1;
                    answer = n2 - n1;
                }
                break;
            case 2:
                while(n1*n2>20){
                    n1 = Math.round(this.utils.randomNumber(0,10));
                    n2 = Math.round(this.utils.randomNumber(0,10));
                }
                question = n1 + " x " + n2;
                answer = n1 * n2;
                break;           
        }
        return {question: question, answer: answer}
    }
}

export default Mathe;