$(document).ready(function () {
    /* Jquery Light Box /Color Box /Fancy Box */

    $('.fancybox').fancybox();

    $('.fancybox-buttons').fancybox({
        openEffect: 'none',
        closeEffect: 'none',

        prevEffect: 'none',
        nextEffect: 'none',

        closeBtn: false,

        helpers: {
            title: {
                type: 'inside'
            },
            buttons: {}
        },

        afterLoad: function () {
            this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
        }
    });


    /* Jquery UI */
    
    //Global Arrays
    var currentCanvas = [];         //Current Status Of Canvas
    var savedCanvas = [];           //Saved Status of The Current Session

    $(".noticemsg").draggable({
        containment: '#createnotification_preview_notice',                                //if not properly dropped return to its original postion 
        opacity: 0.7,                   //when dragging
        cursor: 'move'                //show move when dragging
    });

    //$(".abc").draggable({                 
    //    revert: 'invalid',              //if not properly dropped return to its original postion 
    //    opacity: 0.7,                   //when dragging
    //    cursor: 'move',                 //show move when dragging
    //    helper: myHelper                //copy of the dragged element is created original element remain there
    //});

    //$(".draggablenotice").draggable({
    //    axis: 'y',                      //only be dragged in y-axis
    //    revert: 'invalid',              //if not properly dropped return to its original postion 
    //    opacity: 0.7,                   //when dragging
    //    cursor: 'move',                 //show move when dragging
    //    //helper: myHelper                //copy of the dragged element is created original element remain there
    //});

    //$('#board_contents').droppable({
    //    accept: '.abc',       //this Drop zone only accepts items belongs to class "tools"
    //    //greedy: true,           //any parent droppables will not receive the element.
    //    //tolerance: 'fit'      //Draggable overlaps the droppable entirely.
    //    drop: function (event, ui) { //ui object of type "Object" typeOf()
    //        //clone from the helper element
    //        var clonedObj = $(ui.helper).clone();
    //        //add cloned object into Canvas(Droppable)
    //        $('#board_contents').append(clonedObj);
    //        console.log(clonedObj);
    //    }
    //});

    //function myHelper(event, ui) {
    //    var id = event.currentTarget.id;
    //    var cloned = null;
    //    cloned = "<divabc' style='background-color:red; height:200px;width:200px;'></div>";
    //    return cloned;
    //}

    //funtions
    var flag = false;
    if (flag == false) {
        restoreCanvas();
        flag = true;
    }

    function saveCanvas() {
        savedCanvas = [];                                           //clear the savedCanvas array
        var styles = "";
        var contents = "";
        for (i = 0; i < currentCanvas.length; i++) {
            var myObj = returnCopyOf(currentCanvas[i]);             //creates copy of each element of the currentCanvas  
            var partStyle = $(myObj).attr('style');
            styles = styles + partStyle + "%";            
            var partContent = $(myObj).text();
            contents = contents + partContent + "%";
        }
        $("#noticestyle_hd").val(styles);        
        $("#noticecontent_hd").val(contents);
    }

    function restoreCanvas() {
        currentCanvas = [];
        //clear the canvas
        savedCanvas = $('#createnotification_preview_notice div')
        for (i = 0; i < savedCanvas.length; i++) {
            currentCanvas[currentCanvas.length] = $(savedCanvas[i]);            //save the clone of the object in currentCanvas
        }
    }

    function returnCopyOf(src) {
        var element = $(document.createElement('div'));
        var estyle = $(src).attr('style');
        var eclass = $(src).attr('class');
        $(element).attr('style', estyle);
        $(element).attr('class', eclass);
        $(element).text($(src).text());
        return element;
    }


    /*****Notice Creation*******/

    var currentMsgPart = null;
    $(".noticebg").click(function () {
        var srcImg = $(this).attr('src');
        $("#noticebg_img").attr('src', srcImg);
        $("#noticebg_hd").val(srcImg);
    });

    $("#fontsize_dd").change(function () {
        var fontSize = $(this).val();
        $("#fontsize_hd").val(fontSize);
    });

    $("#fontstyle_dd").change(function () {
        var fontStyle = $(this).val();
        $("#fontstyle_hd").val(fontStyle);
    });

    $("#fontcolor_dd").change(function () {
        var fontColor = $(this).val();
        $("#fontcolor_hd").val(fontColor);
    });

    $("#bold_cb").change(function () {
        if ($(this).is(":checked")) {
            $("#fontbold_hd").val("bold");
        }
        else {
            $("#fontbold_hd").val("100");
        }
    });

    $("#italic_cb").change(function () {
        if ($(this).is(":checked")) {
            $("#fontitalic_hd").val("italic");
        }
        else {
            $("#fontitalic_hd").val("normal");
        }
    });

    $("#underline_cb").change(function () {
        if ($(this).is(":checked")) {
            $("#fontunderline_hd").val("underline");
        }
        else {
            $("#fontunderline_hd").val("none");
        }
    });
   
    $("#addnotice_bt").click(function () {
        var noticeMsg = $("#noticemsg_tf").val();
        if (noticeMsg == "") {
            return;
        }
        var fontSize = $("#fontsize_hd").val() + 0;
        var fontStyle = $("#fontstyle_hd").val();
        var fontColor = $("#fontcolor_hd").val();
        var fontBold = $("#fontbold_hd").val();
        var fontItalic = $("#fontitalic_hd").val();
        var fontUnderline = $("#fontunderline_hd").val();
        var estyle = 'font-weight:' + fontBold + ';font-style:' + fontItalic + ';text-decoration:' + fontUnderline + ';font-family:' + fontStyle + ';font-size:' + fontSize + 'px;color:' + fontColor + ';';
        var e = $(document.createElement('div'));
        e.attr('style', estyle);
        e.attr('class', 'noticemsg');
        e.append(noticeMsg);
        e.draggable();
        currentCanvas[currentCanvas.length] = e;
        $("#createnotification_preview_notice").append(e);
    });

    $("#clearnotice_bt").click(function () {
        $("#createnotification_preview_notice").html("");
        $("#noticemsg_tf").val("");
        $("#noticestyle_hd").val("");
        $("#noticecontent_hd").val("");
        $("#clearall_hd").val("yes");
        currentCanvas = [];
    });

    $("#createnotification_preview_notice").on('click', '.noticemsg', function () {
        var msg = $(this).text();
        $("#noticemsg_tf").val(msg);
    });

    $("#createnotification_back2_bt,#createnotification_next2_bt").click(function () {
        $("#noticetitle_hd").val($("#noticetitle_tf").val());

        if ($(this).val() == "createnotification_next_link") {
            if ($("#noticetitle_tf").val() == null || $("#noticetitle_tf").val() == "") {
                alert("Enter Notice Title");
                $("#noticetitle_tf").focus();
                return false;
            }
        }
        saveCanvas();        
    });


    /*****Board Creation*******/


    $(".boardbordertn").click(function () {
        var srcImg = $(this).attr('src');
        $("#boardborder_img").attr('src', srcImg);
        $("#boardborder_hd").val(srcImg);
    });


    $("#createboard_next1_bt").click(function () {
        $("#boardtitle_hd").val($("#boardtitle_tf").val());

        if ($("#boardtitle_tf").val() == null || $("#boardtitle_tf").val() == "") {
            alert("Enter Board Title");
            $("#boardtitle_tf").focus();
            return false;
        }
    });

    $(".boardcarpet").click(function () {
        var srcImg = $(this).attr('src');
        var style = "background-image:url(" + srcImg + ");";
        $("#createboard_preview_carpet").attr('style', style);
        $("#boardcarpet_hd").val(srcImg);
    });



});
