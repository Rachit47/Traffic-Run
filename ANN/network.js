const mutated_layer1_weights = [
  [
    -0.11298227744322348, 0.022072369565307393, 0.22359483542649683,
    0.2156042508355411, -0.02225440184027362, 0.13314185920481642,
  ],
  [
    -0.04189095043201954, -0.1460347621227708, 0.04911064456483211,
    0.11690390679540756, -0.02015833948537773, 0.36990977109510803,
  ],
  [
    0.0427989011393016, -0.09705649390518176, -0.28295051166157104,
    0.15360878118003513, -0.47374163957819426, -0.13109320713387682,
  ],
  [
    0.2025169811318307, 0.14493514147921155, -0.13618872083790667,
    -0.31966171798064535, -0.08802679633736821, -0.16644735095217916,
  ],
  [
    0.28496223823833294, 0.056677437702331315, 0.012916013562356415,
    -0.09795081929135362, 0.03681814678029696, 0.30452736067235897,
  ],
  [
    -0.28626273419518034, -0.2561602545420829, 0.03637817798906659,
    -0.08278751268858064, -0.04574579172241808, -0.2264715262407318,
  ],
  [
    -0.35655575827049935, -0.07712690242155604, -0.24785070289931785,
    0.17040546652523236, -0.03851294249292972, -0.2172766474004839,
  ],
  [
    -0.09931307552411037, -0.14071211086881072, 0.3087917756548908,
    -0.07830082556140003, -0.08156914662622483, 0.2019010446137434,
  ],
  [
    0.1371263624238501, -0.039640285992660826, -0.13632079174112008,
    -0.1604295147840083, 0.019716241883781876, 0.1703253516376522,
  ],
  [
    -0.07826189838087635, -0.1762931376379595, -0.08587878578160452,
    0.23657394966242273, -0.014679857149582975, 0.010075202536704964,
  ],
  [
    -0.061946385266466536, -0.24060833510872884, 0.14107263753140084,
    0.013987700364671507, 0.14095687764078535, 0.3214801421986246,
  ],
  [
    0.2144703051598737, 0.0010537633916745393, -0.4152168908365857,
    0.13617770128362744, 0.23243277273206997, -0.2793278607931504,
  ],
  [
    -0.0338671462440774, 0.0947627611929559, 0.1493808199011038,
    -0.0030173688461582054, 0.0742878833355782, -0.23788624788236598,
  ],
  [
    -0.05424301321466035, 0.0318425479898512, 0.060497529257146465,
    -0.3171794677760456, 0.23030255561298302, 0.1029703276041039,
  ],
  [
    -0.0768727898044423, -0.052434744507286024, 0.3105474473545996,
    -0.17677862683505535, -0.14220098595293285, -0.07529854122057231,
  ],
  [
    0.0892136518670778, -0.022678689924212625, 0.053029863574154866,
    -0.2369304550611986, 0.2976659839585718, 0.2222044852885014,
  ],
  [
    -0.28429969359153356, 0.14622874173230094, 0.06125436811375248,
    0.1501553970989198, -0.2206293241806909, -0.03088521998630217,
  ],
  [
    0.028851277778207195, -0.40320179886345225, 0.31400829594442314,
    -0.2640349610546725, 0.35922826286538884, 0.20473888021638426,
  ],
  [
    0.16370572308435605, 0.1859893456721883, 0.024483327032765418,
    -0.05668042892620463, 0.1138890116186124, -0.0016938238564190022,
  ],
  [
    0.054113611032605334, 0.0024255900657124685, -0.06315917010820922,
    0.20699329698765112, -0.0815234070404747, 0.06500652435828795,
  ],
];

const mutated_layer2_weights = [
  [
    -0.1469743739967318, 0.29097206672915044, -0.12049921100233671,
    0.26307799006770016,
  ],
  [
    0.3509480248872694, 0.2700688215021728, 0.0465102693661569,
    -0.1799426334913783,
  ],
  [
    0.13511144314545084, 0.049010362840833904, 0.011321756461895482,
    0.26781264608092414,
  ],
  [
    0.37984964026500534, -0.023071421651632437, -0.17768472781963507,
    -0.16721821676466186,
  ],
  [
    0.38590832919126367, 0.34613869867893626, -0.4518905896850639,
    -0.45804677404135463,
  ],
  [
    0.19706859194636017, -0.4412554101505588, 0.051958070033509884,
    -0.04363006621360688,
  ],
];

const hidden_layer_biases = [
  0.0674930411687634, -0.4419850170055677, 0.15242327121689994,
  0.14810642471869517, -0.11052679205811491, -0.21083622320379286,
];
const output_layer_biases = [
  -0.016480549699865815, -0.13018292420696986, -0.21439141604665507,
  0.3683961617011752,
];
class NeuralNetwork {
  //neuronCounts = number of neurons on each layer
  constructor(neuronCounts) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
  }
  static feedForward(givenInputs, network) {
    //calling feedForward() from Ist level to produce its outputs
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    //loop through the remaining levels, updating the outputs with feedForward() result from ith level
    //putting the output of the previous level as the input to the next level
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs; //final outputs will decide in which direction vehicle should move
  }

  //Genetic mutation of out network
  //if the amount = 0, then biases & weights donot change
  static mutate(network, amount = 1) {
    network.levels.forEach((level) => {
      for (let i = 0; i < level.biases.length; i++) {
        //interpolating current bias with current value of any random values b/w -1 & 1
        level.biases[i] = linear_interpolation(
          level.biases[i],
          Math.random() * 2 - 1,
          amount
        );
      }
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].length; j++) {
          //interpolating current weight with current value of any random values b/w -1 & 1
          level.weights[i][j] = linear_interpolation(
            level.weights[i][j],
            Math.random() * 2 - 1,
            amount
          );
        }
      }
    });
  }
}

class Level {
  constructor(inputCount, outputCount) {
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);

    this.weights = [];
    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }
    Level.#randomize(this);
  }

  //random initialization of weights and biases
  static #randomize(level) {
    if (level.inputs.length === 20 && level.outputs.length === 6) {
      for (let i = 0; i < level.inputs.length; i++) {
        for (let j = 0; j < level.outputs.length; j++) {
          //for every input-output pair we have set weight to a random value b/w -1 & 1
          level.weights[i][j] = mutated_layer1_weights[i][j]; //weights are initialized with random values in range: [-1,1]
        }
      }
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = hidden_layer_biases[i];
      }
    } else if (level.inputs.length === 6 && level.outputs.length === 4) {
      for (let i = 0; i < level.inputs.length; i++) {
        for (let j = 0; j < level.outputs.length; j++) {
          //for every input-output pair we have set weight to a random value b/w -1 & 1
          level.weights[i][j] = mutated_layer2_weights[i][j]; //weights are initialized with random values in range: [-1,1]
        }
      }
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = output_layer_biases[i];
      }
    }
  }

  static feedForward(givenInputs, level) {
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i]; //all of the level inputs are initialized to the given input values that are captured using the sensors
    }
    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      }
      //implementing activation function
      //check if the weighted sum of inputs is larger than bias of the output neuron, we set the output neuron ON or activate it
      if (sum > level.biases[i]) {
        level.outputs[i] = 1;
      } else {
        level.outputs[i] = 0;
      }
    }
    return level.outputs;
  }
}
