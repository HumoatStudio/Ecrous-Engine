//Community

function openCommunity() {
    const CommunityPanel = document.getElementById('CommunityPanel');
    CommunityPanel.style.display = 'flex'; // Показываем панель
}

function closeCommunity() {
    const CommunityPanel = document.getElementById('CommunityPanel');
    CommunityPanel.style.display = 'none'; // Скрываем панель
}

// CommunityUploadProject
function openCommunityUploadProject() {
    const CommunityUploadProjectPanel = document.getElementById('CommunityUploadProjectPanel');
    CommunityUploadProjectPanel.style.display = 'flex'; // Show the editor panel
}

function closeCommunityUploadProject() {
    const CommunityUploadProjectPanel = document.getElementById('CommunityUploadProjectPanel');
    CommunityUploadProjectPanel.style.display = 'none'; // Hide the editor panel
}
