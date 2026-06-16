function addAttr(name){
    var p_attr_tag = $("#attribute_" + name)
    console.log(p_attr_tag) 

    var iNewChild = document.querySelector("div#attribute_" + name).childElementCount

    var new_attr = '<div id="attribute_'+name+ '_' + iNewChild + '">'
      new_attr += '<input class="listInputHalf" id="attribute_' + name + '_' + iNewChild + '_key" placeholder="New Attribute Name">'
      new_attr += '&nbsp;:&nbsp;'
      new_attr += '<input class="listInputHalf" id="attribute_' + name + '_' + iNewChild + '_value" placeholder="Value">'
      //new_attr += '<a href="javascript:removeRow(this);">Remove</a><br>' 
      //new_attr += '&nbsp;<label onClick={()=>{removeAttr('+name+','+iNewChild+');}}>Remove</label><br>' 
      new_attr += '&nbsp;<label onClick="javascript:removeAttr('+name+','+iNewChild+');">Remove</label><br>' 
      new_attr += '</div>'
    
    p_attr_tag.append(new_attr)
  }

  function removeAttr(name, iChild) {
    $("#attribute_"+name+"_"+iChild).remove();
  }