module ApplicationHelper
  def heading_block(name, alert=false, &block )
    raw <<END
#{@pagetitle = name unless @pagetitle; '' }
#{'<div class="rootbox">' if alert && current_login && current_login.admin? }
<div class="box">
 <div class="headlines">
    <h2><span>#{name}</span></h2>
 </div>
 <div class="box-content">
   #{capture &block}
</div>
</div>
#{'</div>' if alert && current_login && current_login.admin? }
END
  end

  def current_class?(test_path)
    return 'active' if request.path == test_path
    ''
  end
end
