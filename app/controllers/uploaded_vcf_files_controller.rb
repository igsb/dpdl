class UploadedVcfFilesController < ApplicationController
  before_action :check_access, only: [:show, :edit, :update, :destroy]
  def destroy
    vcf_file = UploadedVcfFile.find_by_id(params[:id])

    if vcf_file != nil
      case_id = vcf_file.patient.case_id
      dirname = File.join('Data/Received_VcfFiles', case_id.to_s)
      path = File.join(dirname, vcf_file.file_name)
      if vcf_file.user_id == current_user.id
        File.delete(path) if File.exist?(path)
        FileUtils.rm_rf( Dir.glob(path + '*'))

        vcf_file.destroy
      end
      flash[:notice] = 'File removed'
    else
      flash[:alert] = 'File not found'
    end
    redirect_back(fallback_location: root_path)
  end

  private
  def check_access
    access = false
    if not current_user.admin
      user = current_user
      if user.uploaded_vcf_files.exists?(params[:id])
        access = true
      end
    else
      access = true
    end
    if not access
      flash[:alert] = 'You do not have permissions to enter this case!'
      redirect_back(fallback_location: root_path)
    end
  end

  def check_read_only
    if current_user.username == "demo"
      flash[:alert] = 'You do not have permissions to modify this case!'
      redirect_back(fallback_location: root_path)
    end
  end

  def check_demo
    @demo = false
    if current_user.username == "demo"
      @demo = true
    end
  end
end
