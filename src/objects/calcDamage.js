//When player attack enemy,they will attack each other.
//palyer and enemy have different or same attack number (such as,palyer:3,enemy:2),it is about the player and enemy attribute.
//player and enemy have different possiblity of attack successfully,the number bewteen(0,1), if the number is 0.8,it means it has 80% possibility to attack successfully.
//if the damage is 0 or positive,it means player wins,the enemy was destoried,the player will gain scroe,
//if the damage is negative,it means enemy wins,the player will lose its health.


function calcDamage(player_attack,player_attackpro,enemy_attack,enemy_attackpro){
    let damage = 0;
    for(let i=0;i<player_attack;i++){
        let randNum1 = attackPro(player_attackpro);
        console.log(randNum1);
        damage = damage + randNum1*1;
    }
    for(let j=0;j<enemy_attack;j++){
        let randNum2 = attackPro(enemy_attackpro);
        console.log(randNum2);
        damage = damage + randNum2*(-1); 
    }
    return damage;
} 

function attackPro(attackpro){
    let list1=[];
    for(let i = 0;i<attackpro*10;i++){
        list1.push('1')
    }
    for(let j=0;j<10-attackpro*10;j++){
        list1.push('0')
    }
    return list1[Math.floor(list1.length*Math.random())];

}

console.log(calcDamage(3,0.85,3,0.8));





