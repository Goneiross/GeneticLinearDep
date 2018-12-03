/** ------ Description -------
 *  CLASS UNIT :
 *    var :
 *      nbUnits
 *      mark[unitNumber]
 *      map[unitNumber][Vector]
 *    function :
 *      mark : || V' - V ||
 */

class units{
  constructor(nbUnits, nbVectors, objective){
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
    this.objective = objective;
  }
  get mark(){ //MAYBE BETTER DOING ORTH PROJ BEFORE
    for (let unit = 0; unit < this.nbUnits; unit++){
      let tmpMark = 0;
      for (let v = 0; v < nbVectors; v++){
        tmpMark += Math.abs(objective[v] - this.map[unit][v]); //AND WHEN NEGATIVE ????
      }
      this.mark[unit] = tmpMark;
    }
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
function main(nbUnits, time, vector) {

  let units = new units(nbUnits, nbVectors, vector);
  let solution = new Array();
  for (let i = 0; i < nbVectors; i++){
    solution[i]=0;
  }
  let bestMarkPerYear = new Array();
  for (let i = 0; i < time; i++){
    bestMarkPerYear[i]=0;
  }

  units.randIni()

  for (let year = 0; year < time; year++){
    units.mark();
    let nextUnits = new units(nbUnits, nbVectors, vector);
    for (let u = 0; u < nbunits, Units; u++){
      let father = selection(units);
      let mother = selection(units);
      nextUnits.reproduction(father, mother, c);
    }
    nextUnits.mark();
    units.eugenisme(nextUnits);
    units.deces();

    let tmp = units.mark[0];
    let tmp2 = 0;
    for (let u = 0; u < nbunits, Units; u++){
      if (tmp < units.mark[i]){
        tmp = units.mark[i];
        tmp2 = i;
      }
    }
    bestMarkPerYear[year] = tmp;
    for (let i = 0; i < nbVectors; i++){
      solution[i]= units.map[tmp2][i];
    }
  }
  return(solution);
}

function analysis() {
}
