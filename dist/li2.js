const divElement = document.createElement('div');
divElement.classList.add('image-viewer-model');
divElement.innerHTML = ` <div class="overlay"></div>
        <div class="image-viewer-image">
                <img src alt="">
        </div>
        <div class="controls playpause">
            <img src="images/play.png">
        </div>
        <div class="info">image 1 of 6</div>

        <div class="controls close">
            <img src="images/close2.png">
        </div>

        <div class="controls forward">
           <img src="images/next.png">
        </div>

        <div class="controls backward">
            <img src="images/prev.png">
        </div>`;

const body = document.querySelector('body');
body.appendChild(divElement);



class Lightbox{
         imageTransitionTiming = 500;
         slideShowTime = 1500;
         model = document.querySelector('.image-viewer-model');
         modelImage = document.querySelector('.image-viewer-model .image-viewer-image img');
         modelOverlay = document.querySelector('.image-viewer-model .overlay');
         modelCloseIcon=  document.querySelector('.image-viewer-model .close'); 
         modelNextIcon=  document.querySelector('.image-viewer-model .forward'); 
         modelPrevIcon=  document.querySelector('.image-viewer-model .backward'); 
         modelPlayPauseIcon=  document.querySelector('.image-viewer-model .playpause'); 
         modelInfo=  document.querySelector('.image-viewer-model .info'); 
         images;
         currentIndex;
         isSlideShowRunning= false;
         timevar;
         timevar2;

         constructor(){

                   
                        this.images= document.querySelectorAll('.container .image img');
                        this.images.forEach((image,index)=>{
                             image.onclick =()=>{
                            this.showImage(index);
               
                             }

                        })


              this.modelCloseIcon.onclick = this.closeModel;
               this.modelOverlay.onclick = this.closeModel;
                        
          

          this.modelNextIcon.onclick=()=>{
          	    clearTimeout(this.timevar);
                this.currentIndex++;
                this.showImage(this.currentIndex);
                this.isSlideShowRunning=false;
                 this.modelPlayPauseIcon.firstElementChild.src ='images/play.png';
          }
                        
           this.modelPrevIcon.onclick=()=>{
             	clearTimeout(this.timevar);
                this.currentIndex--;
                this.showImage(this.currentIndex);
                this.isSlideShowRunning=false;
                 this.modelPlayPauseIcon.firstElementChild.src ='images/play.png';
          }       
                           
           this.modelPlayPauseIcon.onclick=()=>{
           	if(this.isSlideShowRunning){
           		this.isSlideShowRunning=false;
           		clearTimeout(this.timevar);
                 this.modelPlayPauseIcon.firstElementChild.src ='images/play.png';
           	}else{
           		this.isSlideShowRunning=true;
                this.slideShow();
                this.modelPlayPauseIcon.firstElementChild.src ='images/pause.png';
           	}
           }

         }
          
          // image show krne ke liye

         showImage =(imageIndex)=>{
         	clearTimeout(this.timevar2);
             if(imageIndex>this.images.length-1){
             	imageIndex =0;
             }
              if(imageIndex<0){
              	imageIndex =this.images.length-1;
              }

              this.model.style.display = 'block';
              setTimeout( ()=>{ 
              	this.model.style.opacity = '1';
              })
             
              this.modelInfo.textContent = `Image ${imageIndex+1}  of  ${this.images.length}`;

             this.modelImage.style.opacity = '0';
             this.timevar2 = setTimeout( ()=>{
             this.modelImage.src = this.images[imageIndex].src;
         	  this.modelImage.style.opacity = '1';	
             }, this.imageTransitionTiming)
         
         	this.currentIndex = imageIndex;
         }


         closeModel =()=>{
         	 clearTimeout(this.timevar);
         	 this.modelPlayPauseIcon.firstElementChild.src = 'images/play.png';
             this.isSlideShowRunning=false;
             this.model.style.opacity = '0'
             setTimeout( ()=>{
             	this.model.style.display = 'none';
             },500)
         
         }
 
 
       slideShow =()=>{
           this.currentIndex++;
           this.showImage(this.currentIndex);
         this.timevar = setTimeout( ()=>{
           	this.slideShow()
           },this.slideShowTime)
       }  
         
    

      option = (obj)=>{
       if( typeof(obj) != 'object')
        throw "bad parameter passed. objected exected";
        if(obj.backgroundOpacity){
      this.modelOverlay.style.backgroundColor = `rgba(0,0,0, ${obj.backgroundOpacity})`
           }

      if(obj.imageTransitionTiming){
      this.modelImage.style.transitionDuration = `${obj.imageTransitionTiming/2}s`
      this.imageTransitionTiming = (obj.imageTransitionTiming/2)*1000
       }

        this.modelNextIcon.style.display = (obj.disableNavigation) ? 'none' : 'block';
        this.modelPrevIcon.style.display = (obj.disableNavigation) ? 'none' : 'block';
       this.modelPlayPauseIcon.style.display = (obj.disableSlideShow) ? 'none' : 'block';
        this.modelInfo.style.display = (obj.disableInfo) ? 'none' : 'block';
        this.slideShowTime= (obj.slideShowtiming) ? obj.slideShowTiming*1000 : 1500;

       
     }


          }

 
 const lightbox = new Lightbox('[lightbox]');

 
