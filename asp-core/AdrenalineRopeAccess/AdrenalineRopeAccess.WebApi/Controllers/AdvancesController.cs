﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdrenalineRopeAccess.EfCore;
using AdrenalineRopeAccess.Entities;
using AutoMapper;
using AdrenalineRopeAccess.Dtos.Advances;

namespace AdrenalineRopeAccess.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdvancesController : ControllerBase
    {
        #region Data And Constructor
        private readonly AdrenalineDbContext _context;
        private readonly IMapper _mapper;

        public AdvancesController(AdrenalineDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Actions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvanceListDetailsDto>>> GetAdvances()
        {
            var advances = await _context.Advances
                                         .Include(a => a.Employee)
                                         .ToListAsync();

            var advancesDto = _mapper.Map<List<AdvanceListDetailsDto>>(advances);

            return advancesDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdvanceListDetailsDto>> GetAdvance(int id)
        {

            var advance = await _context.Advances
                                        .Include(a => a.Employee)
                                        .SingleOrDefaultAsync(a => a.Id == id);

            if (advance == null)
            {
                return NotFound();
            }

            var advanceDto = _mapper.Map<AdvanceListDetailsDto>(advance);

            return advanceDto;
        }

        [HttpPost]
        public async Task<ActionResult> CreateAdvance(AdvanceDto advanceDto)
        {
            var advance = _mapper.Map<Advance>(advanceDto);

            advance.AdvanceDate = DateTime.Now;

            _context.Advances.Add(advance);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAdvance(int id, AdvanceDto advanceDto)
        {
            var advance = await _context.Advances
                                        .Include (a => a.Employee)
                                        .SingleAsync(a => a.Id == id);

            _mapper.Map(advanceDto, advance);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdvanceExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdvance(int id)
        {

            var advance = await _context.Advances.FindAsync(id);

            if (advance == null)
            {
                return NotFound();
            }

            _context.Advances.Remove(advance);
            await _context.SaveChangesAsync();

            return NoContent();
        } 
        #endregion

        #region Private Methods
        private bool AdvanceExists(int id)
        {
            return (_context.Advances?.Any(e => e.Id == id)).GetValueOrDefault();
        } 
        #endregion
    }
}
