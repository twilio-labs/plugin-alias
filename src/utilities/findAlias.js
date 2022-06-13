 function findAlias(userAlias, json_data) {

    for (let i = 0; i < json_data["aliases"].length; i++) {
      if(json_data["aliases"][i]["name"] == userAlias){
        return {"exist": true, "index": i};;
      }
    }

    return {"exist": false, "index": -1};
}

module.exports = findAlias