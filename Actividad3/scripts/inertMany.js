for(i=0;i<5000;i++){
    db.players.insertOne({
        "firstName": "Trevor",
        "lastName": "Ariza",
        "playerId": 2772,
        "teamId": 1610612748
      });

      db.players.insertOne( {
        "firstName": "Marvin",
        "lastName": "Bagley III",
        "playerId": 1628963,
        "teamId": 1610612758
      });

      db.players.insertOne(   {
        "firstName": "Bradley",
        "lastName": "Beal",
        "playerId": 203078,
        "teamId": 1610612764
      });
}