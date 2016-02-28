$(document).ready(function() {
    $('.category-handle').click(function() {
        $('.handle-list').slideToggle();
    })
});

$(document).ready(function() {
    var checked = $('input[type|="hidden"]').attr('data-checked');
    $('input[type|="radio"]').each(function() {
        if ($(this).attr('id') == checked) {
            $(this).attr('checked', 'checked');
        };
    })
})


$(document).ready(function saveNews() {
    $('#save-news').click(function() {
        var newsData = jsonWrite();
        $.ajax({
            url: '/news/add/save',
            type: "POST",
            dataType: 'JSON',
            data: {
                "newsData": JSON.stringify(newsData)
            },
            success:function(data){
            	window.location=data.url;
            }
        });
    });
});

$(document).ready(function saveCategory() {
    $('#save-category').click(function() {
        var categoryData = jsonWrite();
        $.ajax({
            url: '/category/add/save',
            type: "POST",
            dataType: 'JSON',
            data: {
                "categoryData": JSON.stringify(categoryData)
            },
            success:function(data){
            	window.location=data.url;
            }
        });
    })
})


$(document).ready(function deleteNews() {
    $('.news-delete').each(function() {
        $(this).click(function() {
            var deleteid = $(this).parents('tr').attr('id');
            $.ajax({
                url: '/news/delete',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    "deleteid": deleteid
                },
                success: function(data) {
                    if (data.success) {
                        $('#' + deleteid).remove();
                    }
                }
            });
        });
    });
});


$(document).ready(function deleteCategory(){
	$('.category-delete').each(function(){
		$(this).click(function(){
			var deleteid=$(this).parents('tr').attr('id');
			$.ajax({
				url:'/category/delete',
				type:'POST',
				dataType:'JSON',
				data:{
					"deleteid":deleteid
				},
				success:function(data){
					if (data.success) {
						$('#'+deleteid).remove();
					};
				}
			})
		})
	})
})

function jsonWrite() {
    var data = $('#add').serializeArray();
    var jsonObj = {};
    jsonObj.categoryId = $('input:checked').attr('id');
    $.each(data, function() {
        if (jsonObj[this.name]) {
            if (!jsonObj[this.name].push) {
                jsonObj[this.name] = [jsonObj[this.name]];
            }
            jsonObj[this.name].push(this.value);
        } else {
            jsonObj[this.name] = this.value;
        }
    });
    return jsonObj;
}

$(document).ready(function() {
    $('.msg').bind('input propertychange', function() {
        var label = $('input:checked').val();
        btnAbled(label);
    });

    $('.radio-inline').each(function() {
        $(this).click(function() {
            var label = $(this).prev().val()
            btnAbled(label);
        });
    });
});

$(document).ready(function() {
    var label = $('input:checked').val();
    btnAbled(label);
});


function btnAbled(label) {
    if (isNull(label)) {
        $('#save-news,#save-category').removeAttr("disabled");
    } else {
        $('#save-news,#save-category').attr("disabled", "disabled");
    }
}

function isNull(label) {
    var pattern = /^[ ]+$/;
    var val;
    var result;
    if (label) {
        $('.msg').each(function() {
            val = $(this).val();
            if (pattern.test(val) || !val) {
                result = false;
                return false;
            } else {
                result = true;
            }
        });
        return result;
    } else {
        return false;
    };
};


$(document).ready(function(){
    $('#search-bt').click(function(){
        var keyword=$('.search-text').val();
        var pattern = /^[ ]+$/;
        if (pattern.test(keyword)||!keyword) {
            return false;
        }else{
            $.ajax({
                url:'/search/result',
                type:'POST',
                dataType:'JSON',
                data:{
                    "keyword":keyword
                },
                success:function(data){
                    result(data);
                }
            })
        }
    })
});


function result(data){
    if (!data[0]) {
        var tr=$('<tr>').appendTo($('tbody'));
        $('<td>').text('没有相关内容').appendTo(tr);
        return false;
    }else{
        var td='<td class="title"></td><td class="source"></td><td class="categoryname"></td><td class="date"></td><td class="operate"><a class="btn btn-primary btn-xs view" role="button">查看</a><a class="btn btn-default btn-xs edit" role="button">编辑</a><button class="btn btn-danger btn-xs news-delete">删除</button></td>'
        $.each(data,function(i){
            var tr=$('<tr>').attr('id',data[i].newsId).appendTo($('tbody')); 
            var trId=$('#'+data[i].newsId);
            trId.append(td);
            trId.find('.title').text(data[i].newsTitle);
            trId.find('.source').text(data[i].newsSource);
            trId.find('.categoryname').text(data[i].categoryName);
            trId.find('.date').text(data[i].date);
            trId.find('.view').attr('href','/news/details/'+data[i].newsId);
            trId.find('.edit').attr('href','/news/edit/'+data[i].newsId);
        })
    }
}