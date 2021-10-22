//When player attack enemy,they will attack each other.
//palyer and enemy have different or same attack number (such as,palyer:3,enemy:2),it is about the player and enemy attribute.
//if the damage is positive,it means player wins,the enemy was destoried,the player will gain scroe,
//if the damage is negative,it means enemy wins,the player will lose its health.


function calcDamage(player_attack,enemy_attack){
    let damage = 0;
    for(let i=0;i<player_attack;i++){
        let randNum1 = Math.floor(Math.random()*2);
        //console.log(randNum1);
        damage = damage + randNum1*1;
    }
    for(let j=0;j<enemy_attack;j++){
        let randNum2 = Math.floor(Math.random()*2);
        //console.log(randNum2);
        damage = damage + randNum2*(-1); 
    }
    return damage;
}  

console.log(calcDamage(3,2))





