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
    this.mark = [];
    for (let i = 0; i < nbUnits; i++){
      this.mark.push(0);
    }
    this.map = []
    for (let i = 0; i < nbUnits; i++){
      this.map.push([]);
      for (let j = 0; j < this.nbVectors; j++){
        this.map[i].push(0);
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
      let tmpVector = [];
      for (let i = 0; i < this.nbPoints; p++){
        tmpVector.push(0);
      }
      for (let v = 0; v < this.nbVectors; v++){
        for (let w = 0; w < this.map[u][v]; w++){
          for (let p = 0; p < this.nbPoints; p ++){
            tmpVector[p] += w * this.vectorBase[v][p];
          }
        }
      }
      for (let v = 0; v < this.nbVectors; v++){
        tmpMark += Math.abs(objective[v] - tmpVector[v]); //AND WHEN NEGATIVE ????
      }
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
      this.map.push([]);
      for (let v = 0; v < this.nbVectors; v++){
        this.map[u].push(nextUnits.map[u - this.nbUnits][v]);
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

    let tmpVector = [];
    let r = Math.floor(Math.random() * (2));

    if (r == 0){
      for (let v = 0; v < Math.floor(this.nbVectors / 2); v ++){
        tmpVector.push(father[v]);
      }
      for (let v = Math.floor(this.nbVectors / 2); v < this.nbVectors; v ++){
        tmpVector.push(mother[u]);
      }
    } else {
      for (let v = 0; v < Math.floor(this.nbVectors / 2); v ++){
        tmpVector.push(mother[v]);
      }
      for (let v = Math.floor(this.nbVectors / 2); v < this.nbVectors; v ++){
        tmpVector.push(father[u]);
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

  let nbVectors = objective.length;
  let nbPoints = vectorBase[0].length;
  let unitsTab = new units(nbUnits, nbVectors, nbPoints, objective, vectorBase);
  let solution = [];
  for (let v = 0; v < nbVectors; v++){
    solution.push(0);
  }
  let bestMarkPerYear = [];
  for (let i = 0; i < time; i++){
    bestMarkPerYear.push(0);
  }

  for (let u = 0; u < nbUnits; u++){
    unitsTab.randIni(u, 0);
  }
  
  for (let year = 0; year < time; year++){
    unitsTab.mark();
    let nextUnits = new units(nbUnits, nbVectors, objective);
    for (let u = 0; u < nbunits, Units; u++){
      let father = selection(unitsTab);
      let mother = selection(unitsTab);
      nextUnits.reproduction(father, mother, u); 
    }
    nextUnits.mark();
    unitsTab.merge(nextUnits);
    unitsTab.eugenisme();
    unitsTab.deces(randNumber);

    let tmp = unitsTab.mark[0];
    let tmp2 = 0;
    for (let u = 0; u < nbunits; u++){
      if (tmp < unitsTab.mark[i]){
        tmp = unitsTab.mark[i];
        tmp2 = i;
      }
    }
    bestMarkPerYear[year] = tmp;
    for (let i = 0; i < nbVectors; i++){
      solution[i]= unitsTab.map[tmp2][i];
    }
  }
  return(solution);
}

let objective = []
let vectorBase = [[]]
let nbUnits = 0;
let time = 0;
let randNumber = 0;

main (nbUnits, time, randNumber, objective, vectorBase);