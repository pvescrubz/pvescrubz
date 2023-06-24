document.addEventListener('DOMContentLoaded', function() {

                [...document.querySelectorAll('.popup-form-button')].forEach(function(item) {
                    item.addEventListener('click', function() {
                        document.querySelector('.modal').classList.toggle('modal_active'),
                        document.querySelector('body').classList.toggle('body_active')
                    });
                     });
                });


                    document.querySelector('.popup-close').addEventListener('click', function()  {
                        document.querySelector('.modal').classList.toggle('modal_active'),
                        document.querySelector('body').classList.toggle('body_active')
                    });


                const modalWindow = document.querySelector('.modal');
                modalWindow.addEventListener('click', el => {
                if (el.target == modalWindow) {
                    document.querySelector('.modal').classList.toggle('modal_active'),
                    document.querySelector('body').classList.toggle('body_active')
                }
                });

            
               

               
