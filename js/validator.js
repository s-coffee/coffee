
function Validator(formSelector){

    function getParent(element, selector){
        
        while (element.parentElement){
            if (element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }

    }


    var formRules = {};
    /*
    * Quy ước tạo rule:
    * - Nếu có lỗi thì return 'error message'
    * - Nếu không có lỗi thì return 'undefined'
    * */

    var validatorRules = {
        required: function (value){
            return value ? undefined : 'Vui lòng nhập lại';
        },
        phone: function (value){
            var regex= /\b0[0-9]{9,10}\b/;
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng số điện thoại'
        }
        
    };

    // Lấy ra form element trong DOM theo 'formSelector'
    var formElement = document.querySelector(formSelector);
    
    // Chỉ xử lý khi có element trong DOM
    if (formElement){

        var inputs = formElement.querySelectorAll('[name][rules]');
        
        for (var input of inputs){

            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules){
                // console.log(rule);
                if (Array.isArray(formRules[input.name])){
                    formRules[input.name].push(validatorRules[rule]);
                } else{
                    formRules[input.name] = [validatorRules[rule]];
                }
            }
            // Lắng nghe sự kiện để validate (blur, change, ...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // Hàm thực hiện validate
        function handleValidate(event){
            var rules = formRules[event.target.name];
            var errorMessage;
            rules.some(function (rule){
                errorMessage= rule(event.target.value);
                return errorMessage;
            });
            
            // Nếu có lỗi thì hiển thị ra website
            if (errorMessage){
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup){
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage){
                        formMessage.innerText = errorMessage;
                    }
                }
                
            }

            return !errorMessage;
        }


        // Hàm clear message lỗi
        function handleClearError(event){
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid');
                var formMessage = formGroup.querySelector('.form-message');
                
                if (formMessage){
                    formMessage.innerText = '';
                }
            }
        }
    }

    // Xử lý hành vi submit form
    formElement.onsubmit = function (event){
        event.preventDefault();

        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;

        for (var input of inputs){
            if (!handleValidate({ target: input })){
                isValid = false;
            }
        }
    
    // Khi không có lỗi thì submit form
    if (isValid){
        formElement.submit();
        alert('Quý khách đã đặt hàng thành công!');
    }
    }

    
}