/** ------ Description -------
 *  CLASS UNIT :
 *    var :
 *      nbUnits
 *      mark[unitNumber]
 *      map[unitNumber][Vector]
 *    function :
 *      mark : || V' - V ||
 */


function max(array, size){
  let maximum = array[0];
  for (let v = 1; v < size; v++){
    if (maximum < array[i]){
      maximum = array[i];
    }
  }
  return (maximum)
}

class units{ //ADD AGE FOR EACH UNIT !
  constructor(nbUnits, nbVectors, nbPoints,objective, vectorBase){
    this.nbUnits = nbUnits;
    this.nbVectors = nbVectors;
    this.nbPoints = nbPoints;
    this.mark = new Array();
    for (let i = 0; i < nbUnits; i++){
      this.mark[i] = 0;
    }
    this.map = new Array();
    for (let i = 0; i < nbUnits; i++){
      this.map[i] = new Array();
      for (let j = 0; j < this.nbVectors; j++){
        this.map[i][j] = 0;
      }
    }
    this.objective = objective;
    this.vectorBase = vectorBase;
  }

  sort(){ //TO DO //Bon vieux tribulle pour gain de temps de dev
    let tmp = 0;
    for (let i = 0; i < this.nbUnits; i++){
      for (let j = 1; j < this.nbUnits; j++){
        if (this.mark[j - 1] > this.mark[j]){
          tmp= this.mark[j - 1];
          this.mark[j - 1] = this.mark[j];
          this.mark[j] = this.mark[j - 1];
          for (let v = 0; v < this.nbVectors; v++){
            tmp = this.map[j - 1][v];
            this.map[j - 1][v] = this.map[j][v];
            this.map[j][v] = tmp;
          }
        }
      }
    }

  }

  randIni(u, version){ // Most important part
    if ( version == 0){ //Full rand = bad idea, but to test
      for (let v = 0; v < this.nbVectors; v++){
        this.map[u][v] = Math.rand() * (max(this.vector) + 1);
      }
    }else {
      console.log("To be implemented")
    }
  }

  mark(){ //MAYBE BETTER DOING ORTH PROJ BEFORE
    for (let unit = 0; unit < this.nbUnits; unit++){
      let tmpMark = 0;
      let tmpVector = new array();
      for (let v = 0; v < this.nbVectors; v++){
        for (let w = 0; w < this.map[u][v]; w++){
          for (let p = 0; p < this.nbPoints; p ++){
            tmpVector[p] += w * this.vectorBase[v][p];
          }
        }
      }
      for (let v = 0; v < this.nbVectors; v++){
        tmpMark += Math.abs(objective[v] - tmpVector[v]); //AND WHEN NEGATIVE ????
      
      this.mark[unit] = tmpMark;
    }
  }

  get selection(){ 
    let sum = 0;
    for (let v = 0; v < this.nbVectors; v++){
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

  merge(nextUnits){
    for (let u = this.nbUnits; u < this.nbUnits + nextUnits.nbUnits; u++){
      this.map[u] = new Array();
      for (let v = 0; v < this.nbVectors; v++){
        this.map[u][v] = nextUnits.map[u - this.nbUnits][v];
      }
      this.mark[u] = 0;
    }
    this.nbUnits += nextUnits.nbUnits;
  }

  eugenisme(){
    this.sort();
    for (let u = this.nbUnits / 2; u < this.nbUnits; u ++){//BE MORE GENERAL
      this.map.pop();
    }
    this.nbUnits /= 2;
  }

  deces(randNumber){
    for (let r = 0; r < randNumber; r++){
      let rand = Math.floor(Math.random() * (this.nbUnits + 1));
      this.randIni(rand, 0);
    }
  }

  reproduction(father, mother, u){ //TO DO

    let tmpVector = new Array();
    let r = Math.floor(Math.random() * (2));

    if (r == 0){
      for (let v = 0; v < Math.floor(this.nbVectors / 2); v ++){
        tmpVector[v] = father[v];
      }
      for (let v = Math.floor(this.nbVectors / 2); v < this.nbVectors; v ++){
        tmpVector[v] = mother[u];
      }
    } else {
      for (let v = 0; v < Math.floor(this.nbVectors / 2); v ++){
        tmpVector[v] = mother[v];
      }
      for (let v = Math.floor(this.nbVectors / 2); v < this.nbVectors; v ++){
        tmpVector[v] = father[u];
      }
    }

    this.mark[u]=0;
    for (let v = 0; v < nbVectors; v++){
      this.map[u][v] = tmpVector[v];
    }
  }
}

/**
 * Compute Linear Dependency using genetic algorithm
 * @param {number} nbUnits 
 * @return best combination
 */
function main(nbUnits, time, randNumber, objective, vectorBase) {

  let units = new units(nbUnits, nbVectors, nbPoints, objective, vectorBase);
  let solution = new Array();
  for (let v = 0; v < nbVectors; v++){
    solution[v]=0;
  }
  let bestMarkPerYear = new Array();
  for (let i = 0; i < time; i++){
    bestMarkPerYear[i]=0;
  }

  for (let u = 0; u < nbUnits; u++){
    units.randIni(u, 0);
  }
  
  for (let year = 0; year < time; year++){
    units.mark();
    let nextUnits = new units(nbUnits, nbVectors, objective);
    for (let u = 0; u < nbunits, Units; u++){
      let father = selection(units);
      let mother = selection(units);
      nextUnits.reproduction(father, mother, u); 
    }
    nextUnits.mark();
    units.merge(nextUnits);
    units.eugenisme();
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
