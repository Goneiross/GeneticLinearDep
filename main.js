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
  get randIni(){
  }

  get selection(){

  }

  get eugenisme(){
  }

  get deces(){
  }

  get reproduction(){
  }

}

/**
 * Compute Linear Dependency using genetic algorithm
 * @param {number} nbUnits 
 * @return best combination
 */
function main(nbUnits, time) {

  let units = new units(nbUnits, nbVectors);
  units.randIni()

  for (let year = 0; year < time; year++){
    units.mark();
    let nextUnits = new units(nbUnits, nbVectors);
    for (let u = 0; u < nbunits, Units; u++){
      let father = selection(units);
      let mother = selection(units);
      nextUnits.reproduction(father, mother, c);
    }
    nextUnits.mark();
    units.eugenisme(nextUnits);
    units.deces();
  }

  return(solution);
}

function analysis() {
}
