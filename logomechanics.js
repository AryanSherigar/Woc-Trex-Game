
document.addEventListener('DOMContentLoaded', () =>{

    const image= document.querySelector('img')
       image.addEventListener ('mouseout', () =>{
       image.src ='images/logo3.png'
    });
    image.addEventListener ('mouseover', () =>{
       image.src ='images/logo2.png'
    });
    
    const rad= document.querySelector('form')
    rad.addEventListener('submit',(e) =>{
         e.preventDefault();
    });
    /*var images = ["images/logo.png","images/1.png","images/2.png"];
    var i = 0;
    var image = document.querySelectorAll('img');
  
    function changeImage() {
      
        (function(img) {
        img.style.opacity = 0;
        setTimeout(function() {
          img.src = images[i];
          i = (i + 1) % images.length;
          img.style.opacity = 1;
        }, 500);
      });
    
    }
  
    setInterval(changeImage, 5000);*/
});
