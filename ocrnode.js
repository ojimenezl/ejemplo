console.log("adentro");
const path = require('path')
const {spawn} = require('child_process')

let publicar = (arg1,req, res) =>{
return new Promise((resolve, reject)=>{

function runScript(){
   console.log("aqui2",arg1)
   return spawn('python', [
      "-u",
      path.join(__dirname, 'ocr.py'),arg1
   ]);
}
const subprocess = runScript()


// print output of script
subprocess.stdout.on('data', (data) => {
   var dat=data.message
   console.log(`entrado al fin ${data}`)
   resolve(data);
});
subprocess.stderr.on('data', (data) => {
   console.log(`error:${data}`);
});
subprocess.stderr.on('close', () => {
   console.log("Closed");
});
})
};

module.exports = {
    publicar
}