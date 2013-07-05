$(document).ready(function(){
    var piglet_cell_id_min = 1,
        piglet_cell_id_max = 20,
        piglet_cell_id_cur = 0,
        piglets = new Array();
        cell_counter = 0,
        piglet_counter = 1,
        delimiter = 0,
        cur_pig_id = 0,
        cur_pig_cell = 0,
        cells_gone = 0;

        current_max_value = piglet_cell_id_max;
        while (cell_counter < piglet_cell_id_max) {

            piglet_cell_id_cur = Math.floor((Math.random()*current_max_value)+1);
            (piglet_cell_id_cur == current_max_value) ? --current_max_value : current_max_value;

             if (( jQuery.inArray(piglet_cell_id_cur, piglets) < 0 )&&(piglet_cell_id_cur != 0)) {
                 piglets[++cell_counter] =  piglet_cell_id_cur;
             }
        }

        piglets.forEach(function(cell_id){
            (delimiter % 2) ? piglet_counter : ++piglet_counter;
            $("#cell"+cell_id).append('<img src=./images/piglet/pig'+piglet_counter+'.png/>');
            ++delimiter;
        })

        $(".app_body table td").on('click', function() {
            var td_image = $(this).children('img');

            td_image.closest('td').animate({ 'background-position': '-150px' }, 200);
            td_image.delay(100).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});

            setTimeout(function(){
                td_image.animate({opacity: 0},500);
                td_image.closest('td').delay(200).animate({ 'background-position': '0' }, 500);
                if((td_image.attr('src') == cur_pig_id) && (td_image.closest('td').attr('id')!=cur_pig_cell)){
                    td_image.closest('td').css('background','none');
                    var prev_cell = $('#'+cur_pig_cell).css('background','none');
                    td_image.remove();
                    prev_cell.children('img').remove();
                    cells_gone+=2;
                    if(cells_gone == piglet_cell_id_max) {
                        $(".game_over").show('slow');
                    }
                }
                cur_pig_id = td_image.attr('src');
                cur_pig_cell = td_image.closest('td').attr('id');
            },1500);
        })

})

function newGame() {
    $(".game_over").hide('slide', { direction:'down'});
    location.reload();
}