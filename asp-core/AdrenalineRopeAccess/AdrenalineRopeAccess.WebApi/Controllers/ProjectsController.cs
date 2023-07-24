using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdrenalineRopeAccess.EfCore;
using AdrenalineRopeAccess.Entities;
using AutoMapper;
using AdrenalineRopeAccess.Dtos.Projects;
using NuGet.Packaging;
using AdrenalineRopeAccess.Dtos.Employees;
using AdrenalineRopeAccess.Dtos.Lookups;

namespace AdrenalineRopeAccess.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        #region Data And Constructor
        private readonly AdrenalineDbContext _context;
        private readonly IMapper _mapper;

        public ProjectsController(AdrenalineDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectListDto>>> GetProjects()
        {
            var projects = await _context.Projects
                                         .ToListAsync();

            var projectsDto = _mapper.Map<List<ProjectListDto>>(projects);

            return projectsDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDetailsDto>> GetProject(int id)
        {

            var project = await _context.Projects
                                        .Include(p => p.Employees)
                                        .Include(p => p.Equipments)
                                        .SingleOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            var projectDto = _mapper.Map<ProjectDetailsDto>(project);

            return projectDto;
        }

        [HttpGet]
        public async Task<ActionResult<List<LookupDto>>> GetProjectsLookup()
        {
            return await _context
                        .Projects
                        .Select(p => new LookupDto { Id = p.Id, Name = p.Name })
                        .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> CreateProject(ProjectDto projectDto)
        {
            var project = _mapper.Map<Project>(projectDto);

            await UpdateProjectEmployees(projectDto.EmployeeIds, project);

          //await UpdateProjectEquipments(projectDto.EquipmentIds, project);

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProject(int id, ProjectDto projectDto)
        {
            if (id != projectDto.Id)
            {
                return BadRequest();
            }


            var project = await GetProjectWithEmployees(id);


            _mapper.Map(projectDto, project);

            try
            {
                await UpdateProjectEmployees(projectDto.EmployeeIds, project);

              //await UpdateProjectEquipments(projectDto.EquipmentIds, project);

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProjectForEdit(int id)
        {
            var project = await _context
                                    .Projects
                                    .Include(p => p.Employees)
                                    .SingleOrDefaultAsync(c => c.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            var projectDto = _mapper.Map<ProjectDto>(project);

            return projectDto;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {

            var project = await _context.Projects
                                        .Include(p => p.Equipments)
                                        .SingleAsync(p => p.Id == id);
                      
            

            if (project == null)
            {
                return NotFound();
            }
            _context.RemoveRange(project.Equipments);
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        } 
        #endregion

        #region Private Methods
        private bool ProjectExists(int id)
        {
            return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private async Task UpdateProjectEmployees(List<int> employeeIds, Project project)
        {
            project.Employees.Clear();

            var employees = await _context.Employees
                                          .Where(p => employeeIds.Contains(p.Id))
                                          .ToListAsync();

            project.Employees.AddRange(employees);
        }

        //private async Task UpdateProjectEquipments(List<int> equipmentIds, Project project)
       // {
       //     project.Equipments.Clear();

      //      var equipments = await _context.Equipments
        //                                  .Where(p => equipmentIds.Contains(p.Id))
         //                                 .ToListAsync();

        //    project.Equipments.AddRange(equipments);
      //  }

        private async Task<Project> GetProjectWithEmployees(int projectId)
        {
            return await _context
                            .Projects
                            .Include(o => o.Employees)
                            .Where(o => o.Id == projectId)
                            .SingleAsync();
        }
        #endregion
    }
}
