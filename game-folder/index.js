
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
console.log(c);

canvas.width = window.innerWidth; //to make the canvas full width temporary for now
canvas.height = window.innerHeight;

const gravity = 0.5;

class Player{
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        
        this.velocity = {
            x:0,
            y:1
        }
        this.width = 30
        this.height = 30
    }

    Draw() {
        c.fillStyle = "purple"
        c.fillRect(this.position.x, this.position.y, this.height, this.width)
    }

    update(){
        this.Draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity //accelerates the fall
        }
        else this.velocity.y = 0;
    }
}




class Platform {
    constructor({x, y}){
        this.position = {
            x,
            y
        }

        this.width = 200;
        this.height = 20;
    }

    Draw() {
        c.fillStyle = "blue";
        c.fillRect( this.position.x, this.position.y, this.width, this.height);
    }
}




const player = new Player();
const platforms = [new Platform({x:200, y: 100}), new Platform({x: 500, y: 200})];
// const platform = new Platform();



const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed:false
    }
}



// player.Draw();
player.update();
// platform.Draw();


//win scenario

let scrollOffset = 0;





function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platforms.forEach((platform) => {
        platform.Draw();
    });

    if(keys.right.pressed && player.position.x < 500){
        player.velocity.x = 5;
    } 
    else if(keys.left.pressed && player.position.x > 60){
        player.velocity.x = -5;
    }
    else  {
        player.velocity.x = 0;
        
        if(keys.right.pressed) {
            scrollOffset += 5;
            platforms.forEach((platform) => {
                platform.position.x -= 5;
            });
           
        } else if (keys.left.pressed){
            scrollOffset -= 5;
            platforms.forEach((platform) => {
                platform.position.x += 5;
            });
        }

        if(scrollOffset > 2000){
            console.log("You won!!");
        }
    }

// console.log(scrollOffset);

//platform
//platform collision detection
platforms.forEach((platform) => {
    if(player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
        && player.position.x + player.width >= platform.position.x 
        && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0;
    }
}
);
};

animate();



addEventListener("keydown", ({ key }) => {
    console.log(key);
    switch (key) {
        case 'a':
            console.log("left");
            keys.left.pressed = true;
            break
        
        case 's':
            console.log("down");
            break
        
        case 'd':
            console.log("right");
            keys.right.pressed = true;
            break
        
        case 'w':
            console.log("up");
            player.velocity.y -= 10;
            break
    }
} );



addEventListener("keyup", ({key}) => {
    // console.log(key);
    switch (key) {
        case 'a':
            console.log("left");
            keys.left.pressed = false;
            break
        
        case 's':
            console.log("down");
            break
        
        case 'd':
            console.log("right");
            keys.right.pressed = false;
            break
        
        case 'w':
            console.log("up");
            player.velocity.y -= 10;
            break
    }
} );


// addEventListener("keydown", function (code){
//     console.log(code);
//     switch (code) {
//         case 'ArrowLeft':
//             console.log("left");
//             break;
        
//         case "ArrowDown":
//             console.log("down");
//             break;
        
//         case 'ArrowRight':
//             console.log("right");
//             break;
        
//         case "ArrowUp" :
//             console.log("up");
//             player.velocity.y -= 20;
//             break
//     }
// } );

