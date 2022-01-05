
class Traveler {
    constructor(name) {
        this._name = name;
        this._food = 1;
        this._isHealthy = true;

    }
    get name(){
        return this._name;
    }

    set name(value){
        if(typeof value === "string"){
            this._name = value;
        }
    }

    get food(){
        return this._food;
    }

    set food(value){
        if(typeof value === "number"){
            this._food = value;
        }
    }

    
    get isHealthy(){
        return this._isHealthy;
    }

    set isHealthy(value){
        if(typeof value === "boolean"){
            this._isHealthy = value;
        }
    }
    
    hunt = function(){
        this._food = this._food + 2;
        
    }

    eat = function(){
        
        if(this._food > 0){
            this._food = this._food - 1;
        } else {
            this._isHealthy = false;
        }
    }

    heal = function(traveler){
        if(traveler.this._isHealthy === false){
            this._isHealthy = true
        } 
    }
}


class Hunter extends Traveler {
    constructor(name, food, isHealthy) {
       super(name, food, isHealthy)
       this._food = 2;
    }
    
    get job(){
        return this._job;
    }
    eat = function(){
        
        if(this._food > 1){
                this._food = this._food - 2;
        } else if(this._food === 1){
                this._food = this._food - 1;
                this._isHealthy = false;
         } else {
                this._isHealthy = false;
        } 
    }  
   
    hunt = function(){
            this._food = this._food + 5; 
    }

    giveFood = function(traveler, numOfFoodUnits){
        if(numOfFoodUnits <= this._food){
            traveler.food = traveler.food + numOfFoodUnits;
            this._food = this._food - numOfFoodUnits;
        }
    }
}

class Doctor extends Traveler {
    constructor(name, food, isHealthy, job) {
       super(name, food, isHealthy)
    }
    
    heal = function(traveler){
        if(traveler.isHealthy === false){
            traveler.isHealthy = true;
        } 
    }
}

class Wagon {
    constructor(capacity) {
        this._capacity = capacity;
        this._passageiros = [];
    }

    get capacity(){
        return this._capacity;
    }

    set capacity(value){
        if(typeof value === "number"){
            this._capacity = value;
        }
    }

    get passageiros (){
        return this._passageiros;
    }

    getAvailableSeatCount = function (){
        return this._capacity - this._passageiros.length; 
    }

    join = function (traveler){
        if(this._passageiros.length < this._capacity){
            this._passageiros.push(traveler);
        }
    }

    shouldQuarantine = function () {
        for(let i= 0; i<this._passageiros.length; i++){
           if(this._passageiros[i].isHealthy === false) {
               return true;
           }   
        }
        return false;
    }

    totalFood = function () {
        
        let travelersFood = 0;
        
        for(let i= 0; i<this._passageiros.length; i++){
            travelersFood = travelersFood + this._passageiros[i].food;
        }
        return travelersFood;
    }
}




// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
 
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
 
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);