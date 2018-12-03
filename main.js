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

  sort(){
    
  }

  randIni(vectorNumber){ // Toute la convergence ou non viendra d'ici

  }

  mark(){ //MAYBE BETTER DOING ORTH PROJ BEFORE
    for (let unit = 0; unit < this.nbUnits; unit++){
      let tmpMark = 0;
      for (let v = 0; v < nbVectors; v++){
        tmpMark += Math.abs(objective[v] - this.map[unit][v]); //AND WHEN NEGATIVE ????
      }
      this.mark[unit] = tmpMark;
    }
  }

  get selection(){
    let sum = 0;
    for (let v = 0; v < nbVectors; v++){
      sum += this.mark[v];
    }
    let selected = -1;
    this.sort();
    let r = Math.floor(Math.random() * (sum + 1));
    while (r > 0){
      selected += 1;
      r -= this.mark[selected];
    }
    return(selected);
  }

  eugenisme(){
  }

  deces(randNumber){
    for (let r = 0; r < randNumber; r++){
      let rand = Math.floor(Math.random() * (this.nbUnits + 1));
      this.randIni(rand);
    }
  }

  reproduction(){
  }

}

/**
 * Compute Linear Dependency using genetic algorithm
 * @param {number} nbUnits 
 * @return best combination
 */
function main(nbUnits, time, vector, randNumber) {

  let units = new units(nbUnits, nbVectors, vector);
  let solution = new Array();
  for (let v = 0; v < nbVectors; v++){
    solution[v]=0;
  }
  let bestMarkPerYear = new Array();
  for (let i = 0; i < time; i++){
    bestMarkPerYear[i]=0;
  }

  for (let v = 0; v < nbVectors; v++){
    units.randIni(v);
  }
  
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
    units.deces(randNumber);

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
