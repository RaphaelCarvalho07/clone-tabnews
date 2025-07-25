const { exec } = require("node:child_process");

// const checkPostgress = () => {
//   exec("docker exec postgres-dev pg_isready", handleReturn);

//   const handleReturn = (error, stdout, stderr) => {
//     console.log("🔵 stdout:", stdout);
//   };
// };

function checkPostgress() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgress();
      return;
    }
    console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
  }
}

process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões...");
checkPostgress();
