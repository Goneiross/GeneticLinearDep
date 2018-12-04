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
  constructor(nbUnits, nbVectors, nbPoints,vector, vectorBase){
    this.nbUnits = nbUnits;
    this.nbVectors = nbVectors;
    this.nbPoints = nbPoints;
    this.mark = [];
    this.age = [];
    for (let i = 0; i < nbUnits; i++){
      this.mark.push(0);
      this.age.push(0);
    }
    this.map = []
    for (let i = 0; i < nbUnits; i++){
      this.map.push([]);
      for (let j = 0; j < this.nbVectors; j++){
        this.map[i].push(0);
      }
    }
    this.vector = vector;
    this.vectorBase = vectorBase;
  }

  sort(){ //TO DO //Bon vieux tribulle pour gain de temps de dev
    let tmp = 0;
    for (let i = 0; i < this.nbUnits; i++){
      for (let j = 1; j < this.nbUnits; j++){
        if (this.mark[j - 1] > this.mark[j]){
          tmp = this.mark[j - 1];
          this.mark[j - 1] = this.mark[j];
          this.mark[j] = this.mark[j - 1];
          tmp = this.age[j - 1];
          this.age[j - 1] = this.age[j];
          this.age[j] = this.age[j - 1];
          for (let v = 0; v < this.nbVectors; v++){
            tmp = this.map[j - 1][v];
            this.map[j - 1][v] = this.map[j][v];
            this.map[j][v] = tmp;
          }
        }
      }
    }
  }
}

function randIni(units, u, version){ // Most important part
  if ( version == 0){ //Full rand = bad idea, but to test
    for (let v = 0; v < units.nbVectors; v++){
      units.map[u][v] = Math.floor(Math.random() * (max(units.vector) + 1));
    }
  }else {
    console.log("To be implemented")
  }
  units.age[u] = 0;
  units.mark[u] = 0;
}

function mark(units, unit){ //MAYBE BETTER DOING ORTH PROJ BEFORE
    
  let tmpMark = 0;
  let tmpVector = [];
  for (let i = 0; i < units.nbPoints; i++){
    tmpVector.push(0);
  }
  for (let v = 0; v < units.nbVectors; v++){
    for (let w = 0; w < units.map[unit][v]; w++){
      for (let p = 0; p < units.nbPoints; p ++){
        tmpVector[p] += w * units.vectorBase[v][p];
      }
    }
  }
  for (let v = 0; v < units.nbVectors; v++){
    tmpMark += Math.abs(vector[v] - tmpVector[v]); //AND WHEN NEGATIVE ????
  }
  units.mark[unit] = tmpMark;

}

function selection(units){ 
  let sum = 0;
  for (let v = 0; v < units.nbVectors; v++){
    sum += units.mark[v];
  }
  let selected = 0;
  units.sort();
  let r = Math.floor(Math.random() * (sum + 1));
  while (r > 0){
    selected += 1;
    r -= units.mark[selected];
  }
  if (r < 0){
    selected -= 1
  }
  return(selected);
}

function reproduction(units, nextUnits, father, mother, u){ //TO DO

  let tmpVector = [];
  let r = Math.floor(Math.random() * (2));
  console.log("R", r);
  console.log("father", father, units.map[father]);
  console.log("mother", mother, units.map[mother]);
  if (r == 0){
    for (let v = 0; v < Math.floor(units.nbVectors / 2); v ++){
      tmpVector.push(units.map[father][v]);
    }
    for (let v = Math.floor(units.nbVectors / 2); v < units.nbVectors; v ++){
      tmpVector.push(units.map[mother][v]);
    }
  } else {
    for (let v = 0; v < Math.floor(units.nbVectors / 2); v ++){
      tmpVector.push(units.map[mother][v]);
    }
    for (let v = Math.floor(units.nbVectors / 2); v < units.nbVectors; v ++){
      tmpVector.push(units.map[father][v]);
    }
  }

  nextUnits.mark[u]=0;
  for (let v = 0; v < nextUnits.nbVectors; v++){
    nextUnits.map[u][v] = tmpVector[v];
  }
  nextUnits.age [u] = 0;
  nextUnits.mark [u] = 0;
}

function merge(units, nextUnits){
  for (let u = units.nbUnits; u < units.nbUnits + nextUnits.nbUnits; u++){
    units.map.push([]);
    for (let v = 0; v < units.nbVectors; v++){
      units.map[u].push(nextUnits.map[u - units.nbUnits][v]);
    }
    units.mark.push(nextUnits.mark);
    units.age.push(nextUnits.age);
  }
  units.nbUnits += nextUnits.nbUnits;
}

function eugenisme(units){
  units.sort();
  for (let u = units.nbUnits / 2; u < units.nbUnits; u ++){//BE MORE GENERAL
    units.map.pop();
    units.age.pop();
    units.mark.pop();
  }
  units.nbUnits /= 2;
}

function deces(units, randNumber){
  for (let r = 0; r < randNumber; r++){
    let rand = Math.floor(Math.random() * (units.nbUnits + 1));
    randIni(units, rand, 0);
  }
}

/**
 * Compute Linear Dependency using genetic algorithm
 * @param {number} nbUnits 
 * @return best combination
 */
function main(nbUnits, time, randNumber, vector, vectorBase) {
  
  let nbVectors = vector.length;
  let nbPoints = vectorBase[0].length;
  let unitsTab = new units(nbUnits, nbVectors, nbPoints, vector, vectorBase);
  let solution = [];
  for (let v = 0; v < nbVectors; v++){
    solution.push(0);
  }
  let bestMarkPerYear = [];
  for (let i = 0; i < time; i++){
    bestMarkPerYear.push(0);
  }

  for (let u = 0; u < nbUnits; u++){
    randIni(unitsTab, u, 0);
  }
  console.log("INI :");
  console.table(unitsTab.map);
  
  for (let year = 0; year < time; year++){
    for (let unit = 0; unit < nbUnits; unit ++){
      mark(unitsTab, unit);
    }
    console.log("-------------------- YEAR", year + 1, "--------------------");
    console.log("---------- > MARK :")
    console.table(unitsTab.mark);
    let nextUnits = new units(nbUnits, nbVectors, vector);
    for (let u = 0; u < nbUnits; u++){
      let father = selection(unitsTab);
      let mother = selection(unitsTab);
      reproduction(unitsTab, nextUnits, father, mother, u); 
      console.log("CHILD");
      console.log(nextUnits.map[u]);
    }
    for (let unit = 0; unit < nextUnits.nbUnits; unit ++){
      mark(nextUnits, unit);
    }
    merge(unitsTab, nextUnits);
    eugenisme(unitsTab);
    deces(unitsTab, randNumber);
    let tmp = unitsTab.mark[0];
    let tmp2 = 0;
    for (let u = 0; u < nbUnits; u++){
      if (tmp < unitsTab.mark[u]){
        tmp = unitsTab.mark[u];
        tmp2 = u;
      }
    }
    bestMarkPerYear[year] = tmp;
    for (let i = 0; i < nbVectors; i++){
      solution[i]= unitsTab.map[tmp2][i];
    }
    console.log("---------- > NEW MAP :");
    console.table(unitsTab.map);
  }
  return(solution);
}

let vector = [1,0,0,1];
let vectorBase = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
let nbUnits = 10;
let time = 3;
let randNumber = 0;

let solution = main (nbUnits, time, randNumber, vector, vectorBase);
console.table(solution);