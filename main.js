/** ------ Description -------
 *  CLASS UNIT :
 *      nbUnits
 *      mark[unitNumber]
 *      map[unitNumber][Vector]
 *  MARK :
 *      || V' - V ||
 */

class units{
  constructor(nbUnits, nbVectors){
    this.nbUnits = nbUnits;
    this.mark = new Array();
    for (let i = 0; i < nbUnits; i++){
      this.mark[i] = 0;
    }
    this.map = new Array();
    for (let i = 0; i < nbUnits; i++){
      this.map[i] = new Array();
      for (let j = 0; j < nbVectors; j++){
        this.map[i][j] = 0;
      }
    }
    
  }
  get mark(){
    // Compute mark for each unit
  }
}


function ini() {

}

function selection() {

}

function reproduction() {

}

function eugenisme() {

}

function deces() {

}

function main(nbUnits) {

  let units = new units(nbUnits);

}

function analysis() {
}
